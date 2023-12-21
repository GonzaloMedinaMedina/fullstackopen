import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const anecdoteSlice =  createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action)
    {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload 
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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.vote(id);
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer