import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        change(state, action) 
        {
            return state = action.payload
        }
    }
})

export default filterReducer.reducer