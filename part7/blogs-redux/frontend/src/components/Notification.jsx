import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () =>
{
  const notificationState = useSelector(state => state.notification)

  if (notificationState.message === "" || notificationState.message === undefined || notificationState.message === null)
    return null;

  const messageType = notificationState.success ? 'success' : 'error'
  return <div className={messageType}>{notificationState.message}</div>
}

export default Notification;