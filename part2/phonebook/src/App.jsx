import { useState } from 'react'

const FilterPerson = (props) => 
{
  const handleValueChange = props.handleValueChange;
  const filterName = props.filterName;
  const setFilterName = props.setFilterName;
  return (
    <div>
      filter shown with<input value={filterName} onChange={(e) => handleValueChange(e, setFilterName)}/>
    </div>
  )
}

const AddNewPerson = (props) => 
{
  const addName = props.addName;
  const handleValueChange = props.handleValueChange;
  const setNewName = props.setNewName;
  const setNewPhone = props.setNewPhone;
  const newName = props.newName;
  const newPhone = props.newPhone;

  return (
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
  )
}

const ListOfPerson = (props) => 
{
  const persons = props.persons;
  const filterName = props.filterName;

  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase()))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

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
      <FilterPerson handleValueChange={handleValueChange} filterName={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
      <AddNewPerson addName={addName} 
        handleValueChange={handleValueChange} 
        setNewName={setNewName} 
        setNewPhone={setNewPhone} 
        newName={newName} 
        newPhone={newPhone}/>
      <h2>Numbers</h2>
      <ListOfPerson persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App