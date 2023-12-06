const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Test blog 1',
      author: 'Test Author 1',
      url: 'Test Url 1',
      likes: 5
    },
    {
      title: 'Test blog 2',
      author: 'Test Author 2',
      url: 'Test Url 2',
      likes: 8
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}