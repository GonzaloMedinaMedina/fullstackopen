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

export default FilterPerson;