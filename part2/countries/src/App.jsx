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

const CountrySummary = (props) =>
{
  const country = props.country;
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;

  const style =
  {
    margin: 0
  }

  return (
    <div>
      <h1>{name}</h1>
      {capital.map(c => <p style={style}>capital {c}</p>)}
      <p style={style}>area {area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={flag} alt="flag"></img>
    </div>
  )
}

const CountrySection = (props) =>
{
  const countries = props.countries;

  if (countries === null)
  {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length > 1)
  {
    return countries.map(c => <div>{c.name.common}</div>)
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
    <CountrySection countries={countries}/>
    </>
  )
  
}

export default App
