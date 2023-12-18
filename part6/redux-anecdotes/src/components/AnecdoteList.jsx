import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
    {
        if (state.filter === '')
        {
            return state.anecdotes
        }
        else
        {
            return state.anecdotes.filter(a => a.content.includes(state.filter) )
        }
    })
    const dispatch = useDispatch()

    const vote = (id, content) => 
    {
        console.log('vote', id)
        dispatch({ type: 'anecdotes/vote', payload: { id } })
        dispatch({ type: 'notification/change', payload: `You voted '${content}'`})
    }
    
    const sortedAnecdotes = anecdotes.slice().sort((a,b) => b.votes - a.votes)

    return (sortedAnecdotes
    .map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
        </div>
    ))
}

export default AnecdoteList;