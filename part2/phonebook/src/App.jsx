import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addName = (event) => 
  {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newPhone};
    const newPersonStringify = JSON.stringify(newPersonObject);
    let isAddedAlready = false;

    persons.forEach(person => 
    {
      if (JSON.stringify(person) === newPersonStringify)
      {
        alert(`${newName} is already added to phonebook`);
        isAddedAlready = true;
        return;
      }
    })

    if(isAddedAlready)
      return;

    const copy = [...persons]
    copy.push(newPersonObject);
    setPersons(copy);
  }

  const handleNameChange = (event) => 
  {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => 
  {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App