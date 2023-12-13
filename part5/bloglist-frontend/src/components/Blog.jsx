import { useState } from "react"

const Blog = ({ blog }) => 
{
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeVisibilityButton = <button onClick={(e) => { toggleVisibility() }}>{visible ? 'hide' : 'view'}</button>

  return <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      {changeVisibilityButton}
    </div>  
    <div style={showWhenVisible}>
      <div>{blog.title}{changeVisibilityButton}</div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button>like</button></div>
      <div>{blog.author}</div>
    </div>
  </div>
}

export default Blog