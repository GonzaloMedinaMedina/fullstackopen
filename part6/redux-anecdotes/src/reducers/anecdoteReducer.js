import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotesService' 

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer =  createSlice({
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
      return state.concat(asObject(action.payload))
    },
    set(state, action)
    {
      return action.payload
    }
  }
})

export default anecdoteReducer.reducer