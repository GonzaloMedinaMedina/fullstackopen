import { useState, useEffect, useMemo, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { blogUserKey, createBlog as createNewBlog, removeBlog  } from "./services/blogs"
import { incrementBlogLikes} from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const showMessage = (message, success = true, time = 5000) => 
  {
    const messageObject =
    {
      message: message,
      success: success
    }

    setMessage(messageObject);
    setTimeout(() => {
      setMessage(null)
    }, time)
  }

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

  const createBlog = async (blog) => 
  {
    try 
    {
      blogFormRef.current.toggleVisibility();
      const newBlog = await createNewBlog(blog);
      const blogsCopy = [...blogs];
      blogsCopy.push(newBlog)
      setBlogs(blogsCopy)
      showMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } 
    catch (exception) 
    {
      showMessage(`Error creating the new blog ${newBlog}`, false)
      setTimeout(() => {
        showMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) =>
  {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`))
    {
      const result = await removeBlog(blog.id);
      if (result.status === 204)
      {
        const copy = blogs.filter(b => b.id !== blog.id);
        setBlogs(copy);
      }
    }
  }

  const incrementLikesHandler = async (blog) =>
  {
    const response = await incrementBlogLikes(blog);  
    if (response.status === 204)
    {
      const copy = blogs.filter(b => b.id !== blog.id)
      copy.push(blog)
      setBlogs(copy)
    } 
  }

  const blogsCompoents = useMemo(
    () => blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =><Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} incrementLikesHandler={incrementLikesHandler}/>)        
    , [blogs])

  if (user !== '')
  {
    return (
      <div>
        <h2>blogs</h2>
        <Notification messageObject={message}/>
        <div>
          <p>{user.username} logged in <button id='logout' onClick={() => { logOut() }}>logout</button></p>
        </div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlog createBlog={createBlog}/>
        </Togglable>
        {blogsCompoents}
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification messageObject={message}/>
      <Login setUser={setUser} showMessage={showMessage}/>
    </div>
  )
}

export default App