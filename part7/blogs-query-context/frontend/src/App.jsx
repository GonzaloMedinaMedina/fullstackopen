import { useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './services/blogs'
import { useUserValue, useUserDispatch } from './UserContext'
const blogUserKey = 'loggedBlogAppUser'

const App = () => 
{
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await getAll()
  })

  const userDispatch = useUserDispatch()
  const user = useUserValue()
  const blogFormRef = useRef()

  if (result.isLoading)
  {
    return <div>loading blogs...</div>
  }
  else if (result.isError) 
  {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)  

  if (user.username !== '')
  {
    const logOut = () => 
    {
      window.localStorage.removeItem(blogUserKey);
      userDispatch({username: '', token: ''})
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification/>
        <div>
          <p>{user.username} logged in <button id='logout' onClick={() => { logOut() }}>logout</button></p>
        </div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlog blogFormRef={blogFormRef}/>
        </Togglable>
        {sortedBlogs
          .map(blog =><Blog key={blog.id} blog={blog} user={user}/>)}
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