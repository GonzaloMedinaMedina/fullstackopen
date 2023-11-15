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
          const filteredCountries = response.data.filter(c => c.name.common.toLowerCase().includes(filterCountry));
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
    {countries === null ? <p>Too many matches, specify another filter</p> : countries.map(c => <div>{c.name.common}</div>)}
    </>
  )
  
}

export default App
