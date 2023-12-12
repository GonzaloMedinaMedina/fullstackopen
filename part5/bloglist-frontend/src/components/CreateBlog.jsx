import { createBlog } from "../services/blogs";
import { useState } from "react";

const CreateBlog = (props) => 
{
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('') 

    const blogs = props.blogs;
    const setBlogs = props.setBlogs;

    const handleCreateBlog = async (event) => {
        event.preventDefault()
    
        try 
        {
            const blog = {
                title: title,
                author: author,
                url: url
            }    
            const newBlog = await createBlog(blog);
            const blogsCopy = [...blogs];
            blogsCopy.push(newBlog)
            setBlogs(blogsCopy)
        } 
        catch (exception) 
        {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }

    return <form onSubmit={handleCreateBlog}>
    <div>
      Title
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      Author
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      Url
        <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
}

export default CreateBlog;