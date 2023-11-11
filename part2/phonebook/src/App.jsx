import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => 
  {
    event.preventDefault();
    const newNameObject = { name: newName };
    const newNameStringify = JSON.stringify(newNameObject);
    let isAddedAlready = false;

    persons.forEach(person => 
    {
      if (JSON.stringify(person) === newNameStringify)
      {
        alert(`${newName} is already added to phonebook`);
        isAddedAlready = true;
        return;
      }
    })

    if(isAddedAlready)
      return;

    const copy = [...persons]
    copy.push({ name: newName });
    setPersons(copy);
  }

  const handleNameChange = (event) => 
  {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App