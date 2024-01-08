import { useEffect, useMemo, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from "react-redux";
import { createBlog as createBlogReducer } from './reducers/blogsReducer'
import { useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logOut as logOutUser } from './reducers/userReducer'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
  <> 
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
    <br/>
  </>
  )
}

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
      dispatch(initializeUser())
      dispatch(initializeBlogs())
  }, 
  [])

  const createBlog = async (blog) => 
  {
    try 
    {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlogReducer(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added`))
    } 
    catch (exception) 
    {
      dispatch(setNotification(`Error creating the new blog ${blog}`, false))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  const blogsCompoents = useMemo(
    () => sortedBlogs
      .map(blog => <div style={blogStyle} ><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)
    , [blogs])

  if (user.username !== '')
  {
    return (
      <div>
        <h2>blogs</h2>
        <Notification/>
        <div>
          <p>{user.username} logged in <button id='logout' onClick={() => { dispatch(logOutUser()) }}>logout</button></p>
        </div>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={
            <>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <CreateBlog createBlog={createBlog}/>
            </Togglable>  
            {blogsCompoents}
            </>          
            }/>
            <Route path="/users" element={<Users/>} />
            <Route path="/users/:id" element={<UserBlogs/>} />
            <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user}/>} />
          </Routes>
        </Router>
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification/>
      <Login/>
    </div>
  )
}

export default App