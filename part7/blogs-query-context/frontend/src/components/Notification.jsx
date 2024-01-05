import './Notification.css'
import { useNotificationValue } from "../NotificationContext"

const Notification = () => 
{
  const value = useNotificationValue()

  if (value.message === "" || value.message === undefined || value.message === null)
    return null;

  const messageType = value.success ? 'success' : 'error'
  return <div className={messageType}>{value.message}</div>
}

export default Notification;