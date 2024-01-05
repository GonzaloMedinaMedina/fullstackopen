import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
    username: '',
    token: ''
}
const blogUserKey = 'loggedBlogAppUser'

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        change(state, action)
        {
            return state = action.payload
        }
    }
})

export const { change } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem(blogUserKey)

        if (loggedUserJSON) 
        {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(change(user))
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        window.localStorage.removeItem(blogUserKey);
        dispatch(change(initialState))
    }
}

export const logIn = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({username, password,})
        window.localStorage.setItem(blogUserKey, JSON.stringify(user))
        dispatch(change(user))
    }
}

export default userSlice.reducer;