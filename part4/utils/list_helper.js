const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const blogsChecker = (blogs) => 
{
	if (blogs === null ||
        blogs === undefined ||
        blogs.length === 0)
	{
		return true;
	}

	return false;
};

const totalLikes = (blogs) => {
	return blogs !== null ? blogs.reduce( (accumulator, currentValue) => accumulator + currentValue.likes, 0 ) : 0;
};
  
const favoriteBlog = (blogs) => {
    
	if (blogsChecker(blogs))
		return null;

	let favoriteBlog = blogs[0];    

	for (let i = 1; i < blogs.length; i++)
	{
		if (blogs[i].likes > favoriteBlog.likes)
		{
			favoriteBlog = blogs[i];
		}
	}
    
	return {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes
	};
};

const mostBlogs = (blogs) => {
	if (blogsChecker(blogs))
		return null;

	const blogsByAuthor = _.countBy(blogs, 'author');
	var mostBlogs = -1,
		authorWithMoreBlogs = '';


	Object.entries(blogsByAuthor).forEach(([key, value], index) => 
	{
		if(value > mostBlogs)
		{
			mostBlogs = value,
			authorWithMoreBlogs = key;
		}
	});


	return {
		author: authorWithMoreBlogs,
		blogs: mostBlogs
	};
};

const mostLikes = (blogs) => {
	if (blogsChecker(blogs))
		return null;

	const blogsByAuthor = _.groupBy(blogs, 'author');
	var mostLikes = -1,
		authorWithMoreLikes = '';

	Object.entries(blogsByAuthor).forEach(([key, value], index) =>
	{
		var likes = 0;
		value.forEach(b => likes += b.likes);

		if (likes > mostLikes)
		{
			mostLikes = likes;
			authorWithMoreLikes = key;
		}
	});

	return {
		author: authorWithMoreLikes,
		likes: mostLikes
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};