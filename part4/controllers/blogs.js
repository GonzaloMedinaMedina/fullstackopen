const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

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
	const user = request.user;

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
	const userFromRequest = request.user
	const blogToDelete = await Blog.findById(request.params.id)

	if (blogToDelete === null)
	{
		return response.status(404).json({error: 'Request\'s blog to delete not found.'})
	}
	else if (blogToDelete.user.toString() === userFromRequest.id)
	{
		await blogToDelete.deleteOne()
		return response.status(204).end()
	}

	return response.status(400).json({error: 'Request\'s user is not the owner of the blog to delete.'})
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