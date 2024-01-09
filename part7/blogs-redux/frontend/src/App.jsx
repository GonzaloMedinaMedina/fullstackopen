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
  return (
  <> 
    <div className='p-5 border-b border-black'>
      <Link className='m-2 p-2 bg-sky-500 hover:bg-sky-700 rounded-full' to="/">Blogs</Link>
      <Link className='m-2 p-2 bg-sky-500 hover:bg-sky-700 rounded-full' to="/users">Users</Link>
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

  let i=0;

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  const blogsCompoents = useMemo(
    () => sortedBlogs
      .map(blog => <div className={"hover:bg-sky-400 rounded-full text-center " + (i++ % 2 === 0 ? "bg-sky-200" : "bg-blue-200")} style={blogStyle} ><Link className='block' to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)
    , [blogs])

  if (user.username !== '')
  {
    return (
      <div>
        <Router>          
          <Menu/>
          <div className='m-5'>
            <Notification/>
            <div className='border-2 border-blue-500 bg-gray-200 w-fit p-2 rounded'>            
              <p><strong>{user.username}</strong> logged in</p>
              <button className='bg-sky-500 hover:bg-sky-700 rounded-full p-2 w-full' id='logout' onClick={() => { dispatch(logOutUser()) }}>logout</button>
            </div>
            <h2 className='text-4xl font-bold m-5'>blog app</h2>
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
          </div>
        </Router>
      </div>
    )
  }

  return (
    <>
      <Notification/>
      <div className='flex justify-center mt-[10%]'>
        <div className='text-center border-2 border-blue-500 bg-gray-200 w-fit p-2 rounded'>
          <h2 className='text-2xl'>Log in to application</h2>
          <Login/>
        </div>
      </div>
    </>
  )
}

export default App