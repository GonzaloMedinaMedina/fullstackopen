import { useState } from "react";

const CreateBlog = ({createBlog}) => 
{
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('') 

    const handleCreateBlog = async (event) => 
    {
      event.preventDefault(); 
      
      const blog = {
        title: title,
        author: author,
        url: url
      }    
      await createBlog(blog);
    }

    return <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
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
    </>
}

export default CreateBlog;