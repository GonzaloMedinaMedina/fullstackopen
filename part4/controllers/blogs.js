const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
}

blogsRouter.get('/', async (request, response, next) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs);
})

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
	response.json(blog);
})
  
blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

	if (!decodedToken.id)
		return response.status(401).json({ error: 'token invalid' })

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: user.id
	})

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
	const result = await Blog.findByIdAndDelete(request.params.id)
	response.status(result === null ? 404 : 204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
	response.status(result === null ? 404 : 204).end()	
})

module.exports = blogsRouter