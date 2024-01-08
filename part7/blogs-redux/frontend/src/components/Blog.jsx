import { likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addComment } from "../reducers/blogsReducer";

const Blog = ({ blogs, user }) => 
{
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);
  const [comment, setComment] = useState('')
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

  const handleAddComment = async (event) => 
  {
    event.preventDefault();     
    const blogCopy = {...blog}
    blogCopy.comments = [...blogCopy.comments, comment]
    dispatch(addComment(blogCopy));    
  }

  
  if (!blog)
    return null

  const deleteButton = user.username === blog.user.username ? 
    <button id='deleteBlog' onClick={invokeDeleteBlog} style={{backgroundColor:'deepskyblue'}}>remove</button> 
    : 
    null;
  
  let i= 0; 

  return <div style={blogStyle}>
      <h1>
        {blog.title}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div id='like'>{blog.likes} <button id='likeBlog' onClick={incrementLikes}>like</button></div>
      <div>Added by {blog.author}</div>
      <br/>
      <h2>comments</h2>
      <form onSubmit={handleAddComment}>
      <div>
          <input
          id='comment'
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button id='addComment' type="submit">add comment</button>
      </div>
    </form>
      <ul>
        {blog.comments.map(c => <li key={i++}>{c}</li>)}
      </ul>
      {deleteButton}
    </div>
}

export default Blog