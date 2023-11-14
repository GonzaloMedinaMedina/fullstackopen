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

export default AddNewPerson;