const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 30000)
const supertest = require('supertest')
const config = require('../utils/config')
const logger = require('../utils/logger')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info(`Server uri ${config.MONGODB_URI}`)
})

const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs)
  {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

}, 300000)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('the first blog is has Test blog 1 title', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Test blog 1');
}, 100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New title',
    author: 'New author',
    url: 'new url',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('New title')
}, 100000)

test('a blog without likes can be added with likes to 0', async () => {
  const newBlog = {
    title: 'New title',
    author: 'New author',
    url: 'new url'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb();

  const addedBlog = blogsAtEnd.find(b => b.title === 'New title')

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(addedBlog).toBeDefined();
  expect(addedBlog.likes).toBe(0)
}, 100000)

test('a blog without url is not added', async () => {
  const newBlog = {
    title: 'New title',
    author: 'New author',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'New author',
    url: 'new url',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('blog without author is added', async () => {
  const newBlog = {
    title: 'New title',
    url: 'new url',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb();

  const addedBlog = blogsAtEnd.find(b => b.title === 'New title')

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(addedBlog).toBeDefined();
}, 100000)

test('a specific blog can be viewed', async () => {
  const blogs = await helper.blogsInDb()
  const blogToView = blogs[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
  expect(resultBlog.body.id).toBeDefined()
}, 100000)

test('a specific blog can be deleted', async () => {
  const blogsBefore = await helper.blogsInDb()
  const blogToDelete = blogsBefore[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfter = await helper.blogsInDb()

  expect(blogsAfter).toHaveLength(blogsBefore.length - 1)

  const titles = blogsAfter.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})