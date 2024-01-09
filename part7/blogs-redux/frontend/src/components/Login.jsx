import { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";

const Login = () =>
{
  const dispatch = useDispatch()

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
    
        try {
          await dispatch(logIn(username, password))
          dispatch(setNotification(`User ${username} successfully logged!`))
        } catch (exception) {
          dispatch(setNotification('Wrong credentials', false))
        }
        finally {
          setUsername('')
          setPassword('')
        }
    }

    return <form onSubmit={handleLogin}>
    <div className="p-1">
      username
        <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div className="p-1">
      password
        <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className='bg-sky-500 hover:bg-sky-700 rounded-full p-1 w-full' id='login-button' type="submit">login</button>
  </form>
}

export default Login;
