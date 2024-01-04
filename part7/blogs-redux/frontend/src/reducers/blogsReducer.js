import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogslice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        like(state, action)
        {
            const id = action.payload.id
            return state.map(blog =>
                blog.id !== id ? blog : action.payload 
            )
        },
        create(state, action)
        {
            return state.concat(action.payload)
        },
        remove(state, action)
        {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        set(state, action)
        {
            return action.payload
        }
    }
})

export const { like, create, remove, set } = blogslice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(set(blogs))
    }
} 

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        dispatch(create(newBlog))
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
      const updatedBlog = await blogService.incrementBlogLikes(blog);
      dispatch(like(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        const response = await blogService.remove(id)
        if (response.status === 204)
        {
            dispatch(remove(id))
        }
    }
}

export default blogslice.reducer