import { likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { useParams } from "react-router-dom";

const Blog = ({ blogs, user }) => 
{
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);

  if (!blog)
    return null

  const dispatch = useDispatch()

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

  return <div style={blogStyle}>
      <h1>
        {blog.title}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div id='like'>{blog.likes} <button id='likeBlog' onClick={incrementLikes}>like</button></div>
      <div>Added by {blog.author}</div>
      <br/>
      <h2>comments</h2>
      <ul>
        {blog.comments.map(c => <li>{c}</li>)}
      </ul>
      {deleteButton}
    </div>
}

export default Blog