const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs !== null ? blogs.reduce( (accumulator, currentValue) => accumulator + currentValue.likes, 0 ) : 0
}
  
const favoriteBlog = (blogs) => {
    if (blogs === null ||
        blogs === undefined ||
        blogs.length === 0)
    {
        return null;
    }

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
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}