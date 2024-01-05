const Blog = require('../models/blogs');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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
];

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

const createUsers = async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash('sekret', 10);
	const user = new User({ username: 'root', passwordHash });
	const user2 = new User({ username: 'root2', passwordHash });

	await user.save();
	await user2.save();

	return [user, user2];
};

module.exports = {
	initialBlogs, 
	nonExistingId, 
	blogsInDb,
	usersInDb,
	createUsers
};