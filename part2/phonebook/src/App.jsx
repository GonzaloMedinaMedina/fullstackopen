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
      if (person.name === newPersonObject.name)
      {
        alert(`${newName} is already added to phonebook`);
        isAddedAlready = true;
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