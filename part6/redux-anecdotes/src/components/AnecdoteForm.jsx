import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () =>
{
    const dispatch = useDispatch()

    const create = (event) =>
    {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(content)).then(() => {
            dispatch(setNotification(`Anecdote '${content}' added`, 10))
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