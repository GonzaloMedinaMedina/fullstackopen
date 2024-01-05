import { useState } from "react"
import { useNotificationDispatch } from "../NotificationContext";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";

const Login = () =>
{
  const notificationDispatch = useNotificationDispatch()
  const setNotification = ((message, success = true) => 
  {
    notificationDispatch({ message, success })
    setTimeout(() => 
    {
      notificationDispatch({ message: '', success })
    }, 10000)
  })

  const dispatch = useDispatch()

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
    
        try {
          await dispatch(logIn(username, password))
          setNotification(`User ${username} successfully logged!`)
        } catch (exception) {
          setNotification('Wrong credentials', false)
        }
        finally {
          setUsername('')
          setPassword('')
        }
    }

    return <form onSubmit={handleLogin}>
    <div>
      username
        <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id='login-button' type="submit">login</button>
  </form>
}

export default Login;
