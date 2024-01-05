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

export const setNotification = (content, success = true) => {
    return async dispatch => {
        dispatch(change({
            message: content, 
            success: success
        }))
        setTimeout(() => {
            dispatch(change(''))
        }, 10 * 1000)
    }
}

export default notificationSlice.reducer