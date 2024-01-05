import axios from 'axios'
const baseUrl = '/api/blogs'
export const blogUserKey = 'loggedBlogAppUser'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => 
{
  if (token === null)
  {
    const user = JSON.parse(window.localStorage.getItem(blogUserKey))
    if (user !== null)
    {
      setToken(user.token)
    }
  }

  const config = {
    headers: { Authorization: token },
  }
  
  return config;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const createBlog = async (newBlog) => {
  const config = getToken()

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const incrementBlogLikes = async (blog) => {
  const config = getToken()
  const blogUrl = `${baseUrl}/${blog.id}`

  const response = await axios.get(blogUrl, config)
  const blogUpdated = response.data;
  blogUpdated.likes++;

  const result = await axios.put(blogUrl, blogUpdated, config);
  return result.status === 204 ? blogUpdated : 404;
}

export const remove = async (blogId) => {
  const config = getToken()

  return await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, setToken, createBlog, incrementBlogLikes, remove }