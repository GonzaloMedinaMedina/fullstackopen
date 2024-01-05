import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { incrementBlogLikes, remove } from "../services/blogs"
import { useNotificationDispatch } from '../NotificationContext'

const Blog = ({ blog, user }) => 
{
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const likeBlogMutation = useMutation({
    mutationFn: incrementBlogLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
  })

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async (e) => 
  {
    e.preventDefault();
    likeBlogMutation.mutate({...blog})
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const invokeDeleteBlog = async (event) => 
  { 
    event.preventDefault();
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`))
    {
      deleteBlogMutation.mutate(blog.id)
      dispatch({ message: `Removed ${blog.title} blog`, success: false })
      setTimeout(() => 
      {
        dispatch({ message: '', success: false })
      }, 10000)
    }
  }

  const deleteButton = user.username === blog.user.username ? 
    <button id='deleteBlog' onClick={invokeDeleteBlog} style={{backgroundColor:'deepskyblue'}}>remove</button> 
    : 
    null;

  return <div className="blog" style={blogStyle}>
    <div className="hidden" style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button id='viewBlog' onClick={() => { toggleVisibility() }}>view</button>    
    </div>  
    <div className="visible" style={showWhenVisible}>
      <div>
        {blog.title}
        <button onClick={() => { toggleVisibility() }}>hide</button>    
      </div>
      <div>{blog.url}</div>
      <div id='like'>{blog.likes} <button id='likeBlog' onClick={incrementLikes}>like</button></div>
      <div>{blog.author}</div>
      {deleteButton}
    </div>
  </div>
}

export default Blog