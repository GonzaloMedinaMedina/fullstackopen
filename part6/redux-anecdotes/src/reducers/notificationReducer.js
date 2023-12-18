import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        change(state, action) 
        {
            return state = action.payload
        }
    }
})

export default notificationReducer.reducer