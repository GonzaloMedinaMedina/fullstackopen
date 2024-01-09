import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () =>
{
  const notificationState = useSelector(state => state.notification)

  if (notificationState.message === "" || notificationState.message === undefined || notificationState.message === null)
    return null;

  return <div className={"border-solid border-2 bg-slate-300 rounded p-2.5 mb-2.5 text-[20px] " + (notificationState.success ? "text-green-500 border-green-500" : "text-red-500 border-red-500")}>{notificationState.message}</div>
}

export default Notification;