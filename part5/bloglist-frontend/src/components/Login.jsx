import { useState } from "react"
import loginService from "../services/login"
import { blogUserKey } from "../services/blogs"
import PropTypes from 'prop-types'

const Login = ({setUser, showMessage}) =>
{
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
    
        try {
          const user = await loginService.login({username, password,})
          window.localStorage.setItem(blogUserKey, JSON.stringify(user)) 
          setUser(user)
          setUsername('')
          setPassword('')
          showMessage(`User ${user.username} successfully logged!`)
        } catch (exception) {
          showMessage('Wrong credentials', false)
          setTimeout(() => {
            showMessage(null)
          }, 5000)
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
}

export default Login;
