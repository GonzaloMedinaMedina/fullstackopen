import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(change(content))
        setTimeout(() => {
            dispatch(change(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer