import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '', 
    success: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        change(state, action) 
        {
            return state = action.payload
        }
    }
})

export const { change } = notificationSlice.actions

export const setNotification = (content, time = 10, success = true) => {
    return async dispatch => {
        dispatch(change({
            message: content, 
            success: success
        }))
        setTimeout(() => {
            dispatch(change(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer