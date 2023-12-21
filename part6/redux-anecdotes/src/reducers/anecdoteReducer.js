import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const anecdoteSlice =  createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action)
    {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)

      const anecdoteChanged = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : anecdoteChanged 
      )
    },
    create(state, action)
    {
      return state.concat(action.payload)
    },
    set(state, action)
    {
      return action.payload
    }
  }
})

export const { vote, create, set } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(set(anecdotes))
  }
}

export default anecdoteSlice.reducer