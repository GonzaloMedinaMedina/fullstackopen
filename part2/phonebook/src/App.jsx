import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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

    const copy = [...persons]
    copy.push(newPersonObject);
    setPersons(copy);
  }

  const handleValueChange = (event, setFunction) => 
  {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={filterName} onChange={(e) => handleValueChange(e, setFilterName)}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={(e) => handleValueChange(e, setNewName)}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={(e) => handleValueChange(e, setNewPhone)}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase()))
          .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App