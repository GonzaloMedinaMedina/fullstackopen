import { useState } from "react"
import { likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Blog = ({ blog, user }) => 
{
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async (e) => 
  {
    e.preventDefault();
    dispatch(likeBlog(blog)); 
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
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`blog ${blog.title} removed`))
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