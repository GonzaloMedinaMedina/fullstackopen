import React from "react";
import { useDispatch } from "react-redux";
import anecdotesService from "../services/anecdotesService";

const AnecdoteForm = () =>
{
    const dispatch = useDispatch()

    const create = (event) =>
    {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        anecdotesService.create(content).then(newAnecdote => {
            dispatch({ type: 'anecdotes/create', payload: newAnecdote })
            dispatch({ type: 'notification/change', payload: `Anecdote '${content}' added`})
        })
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </>)
}

export default AnecdoteForm;