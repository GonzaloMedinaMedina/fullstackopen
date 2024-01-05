import { useState, useEffect, useMemo, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
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

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  const blogsCompoents = useMemo(
    () => sortedBlogs
      .map(blog =><Blog key={blog.id} blog={blog} user={user}/>)        
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
      <Notification/>
      <Login/>
    </div>
  )
}

export default App