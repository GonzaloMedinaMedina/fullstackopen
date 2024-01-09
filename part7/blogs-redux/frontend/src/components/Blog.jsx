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
    <button className='bg-red-500 m-2 p-3 rounded-full' id='deleteBlog' onClick={invokeDeleteBlog}>remove blog</button> 
    : 
    null;
  
  let i= 0; 

  return <div className="border-2 border-blue-500 bg-gray-200 rounded">
      <div className="p-2">
        <p className="m-1"><strong>Title: </strong>{blog.title}</p>
        <p className="m-1"><strong>Url: </strong><a href={blog.url}>{blog.url}</a></p>
        <p className="m-1" id='like'><strong>Likes: </strong>{blog.likes} <button className="bg-sky-500 hover:bg-sky-700 rounded p-1" id='likeBlog' onClick={incrementLikes}>like</button></p>
        <p className="m-1"><strong>Author: </strong>{blog.author}</p>
      </div>
      <div className="border-2 border-black p-2 m-2 bg-gray-300 w-fit">
        <h2 className="font-bold text-xl m-1">Comments</h2>
        <form onSubmit={handleAddComment}>
        <div>
            <input
            id='comment'
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button id='addComment' type="submit" className="m-1 bg-sky-500 hover:bg-sky-700 rounded p-1">add comment</button>
        </div>
        </form>
        <ul>
          {blog.comments.map(c => <li key={i++}>{c}</li>)}
        </ul>
      </div>
      {deleteButton}
    </div>
}

export default Blog