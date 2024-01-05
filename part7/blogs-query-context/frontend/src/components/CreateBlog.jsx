import { useState } from "react";
import { useNotificationDispatch } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog as createBlogRequest } from "../services/blogs";

const CreateBlog = ({blogFormRef}) => 
{
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const createBlogMutation = useMutation({
    mutationFn: createBlogRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
    onError: () =>  dispatch({ message: 'too short blog title, must have length 5 or more', success: false })
  })
  
  const setNotification = ((message, success = true) => 
  {
    dispatch({ message, success })
    setTimeout(() => 
    {
      dispatch({ message: '', success })
    }, 10000)
  })
  
  const createBlog = async (blog) => 
  {
    try 
    {
      blogFormRef.current.toggleVisibility();
      createBlogMutation.mutate(blog)
      setNotification(`A new blog ${blog.title} by ${blog.author} added`)
    } 
    catch (exception) 
    {
      setNotification(`Error creating the new blog ${blog}`, false)
    }
  }

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
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
          <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
          <input
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='createBlog' type="submit">create</button>
    </form>
  </>
}

export default CreateBlog;