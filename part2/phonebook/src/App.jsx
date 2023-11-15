import { useState, useEffect } from 'react'
import personsService from './service/personsService';
import AddNewPerson from './AddNewPerson';
import FilterPerson from './FilterPerson';
import ListOfPersons from './ListOfPersons';
import './App.css'

const Notification = ({message}) =>
{
  if (message === null)
    return null;

  return <div className='success-message'>{message}</div>
}

const App = () => 
{
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [message, setMessage] = useState('')

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

  const showMessage = (message, time = 5000) => 
  {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, time)
  }

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
                showMessage(`Changed phone number for ${newName} contact.`);
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
        showMessage(`Added ${newName}`)
      })
  }

  const handleValueChange = (event, setFunction) => 
  {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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