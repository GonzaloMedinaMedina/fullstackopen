import personsService from "./service/personsService";

const ListOfPersons = (props) => 
{  
  const filterName = props.filterName;
  const setPersons = props.setPersons;
  const persons = props.persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase()));
  const showMessage = props.showMessage;

  const removePerson = (id, name) => 
  {
    if (window.confirm(`Delete ${name} ?`)) 
    {
      personsService
      .remove(id)
      .then(response =>
      {
        if (response?.status === 204)
        {
          setPersons(persons.filter(p => p.id !== id))
        }
      })
      .catch(error =>
        {
          if(error.response.status === 404 )
          {
            showMessage(`Information of ${name} has already been removed from the server.`, false);
          }
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
