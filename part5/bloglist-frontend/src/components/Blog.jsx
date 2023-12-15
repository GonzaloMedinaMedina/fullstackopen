import { useState } from "react"

const Blog = ({ blog, user, deleteBlog, incrementLikesHandler }) => 
{
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async (e) => 
  {
    e.preventDefault();
    const response = await incrementLikesHandler(blog);
    if (response.status === 204)
    {
      setLikes(blog.likes)
    }  
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
    await deleteBlog(blog);
  }

  const deleteButton = user.username === blog.user.username ? 
    <button onClick={invokeDeleteBlog} style={{backgroundColor:'deepskyblue'}}>remove</button> 
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
      <div id='like'>{likes} <button id='likeBlog' onClick={incrementLikes}>like</button></div>
      <div>{blog.author}</div>
      {deleteButton}
    </div>
  </div>
}

export default Blog