import axios from 'axios'
const baseUrl = '/api/login'

export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  if (response.status === 200)
  {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.data))
  }
  return response.data
}

export default { login }