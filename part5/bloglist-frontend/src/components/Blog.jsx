import { useState } from "react"
import { incrementBlogLikes } from "../services/blogs"

const Blog = ({ blog }) => 
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
    const response = await incrementBlogLikes(blog);
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

  const changeVisibilityButton = <button onClick={() => { toggleVisibility() }}>{visible ? 'hide' : 'view'}</button>

  return <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      {changeVisibilityButton}
    </div>  
    <div style={showWhenVisible}>
      <div>{blog.title}{changeVisibilityButton}</div>
      <div>{blog.url}</div>
      <div>{likes} <button onClick={incrementLikes}>like</button></div>
      <div>{blog.author}</div>
    </div>
  </div>
}

export default Blog