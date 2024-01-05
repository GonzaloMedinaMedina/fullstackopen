import { createContext, useReducer, useContext } from 'react'
import blogService from './services/blogs'

const blogReducer = async (state, action) =>
{
    switch (action.type) {
        case "LIKE":
            const updatedBlog = await blogService.incrementBlogLikes(state);
            return updatedBlog
    }
}

const BlogContext = createContext()

export const BlogProvider = (props) =>
{
    const [blog, blogDispatch] = useReducer(blogReducer, props.children.props.blog)

    return (
        <BlogContext.Provider value={[blog, blogDispatch]}>
            {props.children}
        </BlogContext.Provider>
    )
}

export const useBlogValue = () => 
{
    const blogAndDispatch = useContext(BlogContext)
    return blogAndDispatch[0]
}
  
export const useBlogDispatch = () => 
{
    const blogAndDispatch = useContext(BlogContext)
    return blogAndDispatch[1]
}
  
export default BlogContext