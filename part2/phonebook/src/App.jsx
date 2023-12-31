import { useState, useEffect } from 'react'
import personsService from './service/personsService';
import AddNewPerson from './AddNewPerson';
import FilterPerson from './FilterPerson';
import ListOfPersons from './ListOfPersons';
import './App.css'

const Notification = ({messageObject}) =>
{
  if (messageObject === null || messageObject === undefined)
    return null;

  const messageType = messageObject?.success ? 'success' : 'error'
  const message = messageObject.message;

  return <div className={messageType + ' message'}>{message}</div>
}

const App = () => 
{
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [message, setMessage] = useState(null)

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

  const showMessage = (message, success = true, time = 5000) => 
  {
    const messageObject =
    {
      message: message,
      success: success
    }

    setMessage(messageObject);
    setTimeout(() => {
      setMessage(null)
    }, time)
  }

  const addName = (event) => 
  {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newPhone};
    const repeatedPerson = persons.find(person => person.name === newName);

    if (repeatedPerson)
    {
      if (repeatedPerson.number === newPhone)
      {
        alert(`${newName} is already added to phonebook with number ${newPhone}`);
      }
      else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        personsService
          .update(repeatedPerson.id, newPersonObject)
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
    }
    else
    {
      personsService
        .create(newPersonObject)
        .then(response => {
          setPersons(persons.concat(newPersonObject));
          setNewName('');
          setNewPhone('');
          showMessage(`Added ${newName}`)
        })
        .catch(error => 
        {
          showMessage(error.response.data.error, false)
        })
    }
  }

  const handleValueChange = (event, setFunction) => 
  {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObject={message}/>
      <FilterPerson handleValueChange={handleValueChange} filterName={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
      <AddNewPerson addName={addName} 
        handleValueChange={handleValueChange} 
        setNewName={setNewName} 
        setNewPhone={setNewPhone} 
        newName={newName} 
        newPhone={newPhone}/>
      <h2>Numbers</h2>
      <ListOfPersons persons={persons} setPersons={setPersons} filterName={filterName} showMessage={showMessage}/>
    </div>
  )
}

export default App