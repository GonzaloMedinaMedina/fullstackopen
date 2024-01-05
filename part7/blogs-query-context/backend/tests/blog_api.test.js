const mongoose = require('mongoose');
mongoose.set('bufferTimeoutMS', 30000);
const supertest = require('supertest');
const config = require('../utils/config');
const logger = require('../utils/logger');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/blogs');

beforeEach(async () => {
	const users = await helper.createUsers();
	await Blog.deleteMany({});
	console.log('cleared');

	for (let blog of helper.initialBlogs)
	{
		let blogObject = new Blog({
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes === undefined ? 0 : blog.likes,
			user: users[0].id
		});
		await blogObject.save();
	}

}, 300000);

const loginAndGetToken = async (username = 'root', password = 'sekret') => 
{
	const loginBody = 
  {
  	username: username,
  	password: password
  };

	const loginResult = await api
		.post('/api/login/')
		.send(loginBody)
		.expect(200);
  
	return `Bearer ${loginResult.body.token}`;
};

describe('Check retrieved blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	}, 100000);

	test('there are two blogs', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	}, 100000);

	test('the first blog has Test blog 1 title', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body[0].title).toBe('Test blog 1');
	}, 100000);
  
	test('a specific blog can be viewed', async () => {
		const blogs = await helper.blogsInDb();
		const blogToView = blogs[0];

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultBlog.body.title).toBe(blogToView.title);
		expect(resultBlog.body.author).toBe(blogToView.author);
		expect(resultBlog.body.url).toBe(blogToView.url);
		expect(resultBlog.body.likes).toBe(blogToView.likes);
		expect(resultBlog.body.user).toBe(blogToView.user.toString());
		expect(resultBlog.body.id).toBeDefined();
	}, 100000);
});

describe('Adding new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'New title',
			author: 'New author',
			url: 'new url',
			likes: 20
		};

		const token = await loginAndGetToken();

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: token })
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		const titles = blogsAtEnd.map(r => r.title);

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(titles).toContain('New title');
	}, 100000);

	test('a blog without likes can be added with likes to 0', async () => {
		const newBlog = {
			title: 'New title',
			author: 'New author',
			url: 'new url'
		};

		const token = await loginAndGetToken();

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: token })
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		const addedBlog = blogsAtEnd.find(b => b.title === 'New title');

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(addedBlog).toBeDefined();
		expect(addedBlog.likes).toBe(0);
	}, 100000);

	test('a blog without url is not added', async () => {
		const newBlog = {
			title: 'New title',
			author: 'New author',
			likes: 1
		};

		const token = await loginAndGetToken();

		await api
			.post('/api/blogs')
			.set({ Authorization: token })
			.send(newBlog)
			.expect(400);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	}, 100000);

	test('blog without title is not added', async () => {
		const newBlog = {
			author: 'New author',
			url: 'new url',
			likes: 20
		};

		const token = await loginAndGetToken();

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: token })
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	}, 100000);

	test('blog without author is added', async () => {
		const newBlog = {
			title: 'New title',
			url: 'new url',
			likes: 20
		};

		const token = await loginAndGetToken();

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: token })
			.expect(201);

		const blogsAtEnd = await helper.blogsInDb();

		const addedBlog = blogsAtEnd.find(b => b.title === 'New title');

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(addedBlog).toBeDefined();
	}, 100000);

	test('return error if no token is provided', async () => {
		const newBlog = {
			title: 'New title',
			author: 'New author',
			url: 'new url',
			likes: 20
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401);
	});
});

describe('Delete blog', () => {
	test('a specific blog can be deleted', async () => {
		const blogsBefore = await helper.blogsInDb();
		const blogToDelete = blogsBefore[0];

		const token = await loginAndGetToken();

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: token })
			.expect(204);

		const blogsAfter = await helper.blogsInDb();

		expect(blogsAfter).toHaveLength(blogsBefore.length - 1);

		const titles = blogsAfter.map(r => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	}, 100000);
});

describe('Update blog', () => { 
	test('a specific blog can be updated', async () => {
		const blogs = await helper.blogsInDb();
		const blogToUpdate = blogs[0];
		blogToUpdate.likes = 10;

		const token = await loginAndGetToken();

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set({ Authorization: token })
			.send(blogToUpdate)
			.expect(204);
    
		const updatedBlog = await api
			.get(`/api/blogs/${blogToUpdate.id}`)      
			.set({ Authorization: token })
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(blogToUpdate.likes).toEqual(updatedBlog.body.likes);
	}, 100000);
});

afterAll(async () => {
	await mongoose.connection.close();
});