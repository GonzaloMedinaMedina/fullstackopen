const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', { username: 1, name: 1 });;
	response.json(blog);
});
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
	const body = request.body;
	const user = request.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		comments: [],
		user: user.id
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	savedBlog.user = user;
	response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
	const userFromRequest = request.user;
	const blogToDelete = await Blog.findById(request.params.id);

	if (blogToDelete === null)
	{
		return response.status(404).json({error: 'Request\'s blog to delete not found.'});
	}
	else if (blogToDelete.user.toString() === userFromRequest.id)
	{
		await blogToDelete.deleteOne();
		return response.status(204).end();
	}

	return response.status(400).json({error: 'Request\'s user is not the owner of the blog to delete.'});
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
	const body = request.body;
	const userFromRequest = request.user;
	const blogToUpdate = await Blog.findById(request.params.id);

	if (blogToUpdate === null)
	{
		return response.status(404).json({error: 'Request\'s blog to update not found.'});
	}
	else if (blogToUpdate.user.toString() === userFromRequest.id)
	{
		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: userFromRequest.id
		};

		const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' });
		response.status(result === null ? 404 : 204).end();	
	}
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
	const body = request.body;
	const blogToUpdate = await Blog.findById(request.params.id);

	if (blogToUpdate === null)
	{
		return response.status(404).json({error: 'Request\'s blog to update not found.'});
	}

	blogToUpdate.comments.push(body.comment)
	const result = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true, context: 'query' });
	response.status(result === null ? 404 : 204).end();	
})

module.exports = blogsRouter;