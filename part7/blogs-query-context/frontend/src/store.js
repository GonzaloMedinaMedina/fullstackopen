import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer
  }
})
