import { useState, useEffect } from 'react'
import personsService from './service/personsService';
import AddNewPerson from './AddNewPerson';
import FilterPerson from './FilterPerson';
import ListOfPersons from './ListOfPersons';

const App = () => 
{
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => 
  {
    personsService.getAll()
    .then(response => 
    { 
      if(response?.status === 200 && Array.isArray(response?.data))
      {
        setPersons(response.data);
      }
    });
  }, 
  [])

  const addName = (event) => 
  {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newPhone};
    let isAddedAlready = false;

    persons.forEach(person => 
    {
      if (newName == person.name)      
      {
        isAddedAlready = true;

        if (person.number === newPhone)
        {
          alert(`${newName} is already added to phonebook with number ${newPhone}`);
        }
        else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        {
          personsService
            .update(person.id, newPersonObject)
            .then(response =>
            {
              if (response.status === 200)
              {
                const copy = [...persons];
                const index = copy.indexOf(copy.find(p => p.name === newName));
                copy[index] = response.data;

                setPersons(copy);
              }              
            })
        }
        return;
      }
    })

    if(isAddedAlready)
      return;

    personsService
      .create(newPersonObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPersonObject));
        setNewName('');
        setNewPhone('');
      })
  }

  const handleValueChange = (event, setFunction) => 
  {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson handleValueChange={handleValueChange} filterName={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
      <AddNewPerson addName={addName} 
        handleValueChange={handleValueChange} 
        setNewName={setNewName} 
        setNewPhone={setNewPhone} 
        newName={newName} 
        newPhone={newPhone}/>
      <h2>Numbers</h2>
      <ListOfPersons persons={persons} setPersons={setPersons} filterName={filterName}/>
    </div>
  )
}

export default App