import personsService from "./service/personsService";

const ListOfPersons = (props) => 
{  
  const filterName = props.filterName;
  const setPersons = props.setPersons;
  const persons = props.persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase()));

  const removePerson = (id, name) => 
  {

    if (window.confirm(`Delete ${name} ?`)) 
    {
      personsService
      .remove(id)
      .then(response =>
      {
        if (response?.status === 200)
          setPersons(persons.filter(p => p.id !== id))
        console.log(response)
      })
    }
  }

  const elements = persons.map(person =>       
    <p key={person.id}>
      {person.name} {person.number} 
      <button onClick={() => removePerson(person.id, person.name)}>delete</button>
    </p>)

  return (elements)
}

export default ListOfPersons;
