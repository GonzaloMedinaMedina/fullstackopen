import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Notification = () => 
{
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  useEffect(() => 
  {
    if (notification !== '')
    {
      setTimeout(() => 
      {
        dispatch({ type: 'notification/change', payload: ''})
      }, 5000)
    }
  },
  [notification])
  
  if (notification === '')
  {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification