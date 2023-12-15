import './Notification.css'

const Notification = ({messageObject}) =>
{
  if (messageObject === null || messageObject === undefined || messageObject.message === null)
    return null;

  const messageType = messageObject?.success ? 'success' : 'error'
  const message = messageObject.message;

  return <div className={messageType}>{message}</div>
}


export default Notification;