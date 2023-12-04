const Blog = require('../models/blogs')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}