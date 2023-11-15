import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterCounty = (props) => 
{
  const handleValueChange = props.handleValueChange;
  const filterCountry = props.filterCountry;
  const setFilterCountry = props.setFilterCountry;

  return (
    <div>
      find countries<input value={filterCountry} onChange={(e) => handleValueChange(e, setFilterCountry)}/>
    </div>
  )
}

const CityWeather = (props) =>
{
  const weather = props.weather;

  if (weather === null)
    return null;

  const cityName = weather.name;
  const temp = weather.main.temp;
  const icon = weather.weather[0].icon;
  const windSpeed = weather.wind.speed;

    return (
    <>
      <h1>Weather in {cityName}</h1>
      <p>temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
      <p>wind {windSpeed} m/s</p>
    </>
    )
}

const CountrySummary = (props) =>
{
  const [weather, setWeather] = useState(null);

  const country = props.country;
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;

  const style =
  {
    margin: 0
  }

  useEffect(() => 
  {
    const api_key = import.meta.env.VITE_SOME_KEY
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(response => 
      {
        setWeather(response.data)
      })
  }, 
  [])

  return (
    <div>
      <h1>{name}</h1>
      <p style={style} key={capital}>capital {capital}</p>
      <p style={style}>area {area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={flag} alt="flag"></img>
      <CityWeather weather={weather}/>
    </div>
  )
}

const CountrySection = (props) =>
{
  const countries = props.countries;
  const setCountries = props.setCountries;

  if (countries === null)
  {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length > 1)
  {
    return countries.map(c => <div key={c.name.common}>{c.name.common} <button onClick={() => {setCountries([c])}}>show</button></div>)
  }
  else if (countries.length === 1)
  {
    return <CountrySummary country={countries[0]}/>
  }  
}

function App() 
{
  const [filterCountry, setFilterCountry] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => 
  {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => 
      {
        if(response.status === 200)
        {
          const lowerCaseSearch = filterCountry.toLowerCase();
          const filteredCountries = response.data.filter(c => c.name.common.toLowerCase().includes(lowerCaseSearch));
          if (filteredCountries.length < 10)
          {
            setCountries(filteredCountries);
          }
          else
          {
            setCountries(null);
          }
        }
      })
  }, 
  [filterCountry])

  const handleValueChange = (event, setFunction) => 
  {
    setFunction(event.target.value)
  }

  return (
    <>
    <FilterCounty handleValueChange={handleValueChange} filterCountry={filterCountry} setFilterCountry={setFilterCountry}/>
    <CountrySection countries={countries} setCountries={setCountries}/>
    </>
  )
  
}

export default App
