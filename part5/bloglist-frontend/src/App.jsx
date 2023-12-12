import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import { blogUserKey } from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(blogUserKey)

    if (loggedUserJSON) 
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  useEffect(() => {
    if (user !== '')
    {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  const logOut = () =>
  {
    window.localStorage.removeItem(blogUserKey);
    setUser('')
  }

  if (user !== '')
  {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <p>{user.username} logged in <button onClick={() => { logOut() }}>logout</button></p>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Login setUser={setUser}/>
    </div>
  )
}

export default App