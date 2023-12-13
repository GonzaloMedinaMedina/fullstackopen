import axios from 'axios'
const baseUrl = '/api/blogs'
export const blogUserKey = 'loggedBlogAppUser';

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

export const incrementBlogLikes = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  blog.likes++;

  return await axios.put(`${baseUrl}/${blog.id}`, blog, config);
}

export default { getAll, setToken, createBlog }