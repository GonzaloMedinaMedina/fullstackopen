import { useState } from "react"
import loginService from "../services/login"
import { blogUserKey } from "../services/blogs"

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
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
}

export default Login;