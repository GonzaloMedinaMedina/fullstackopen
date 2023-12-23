import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => 
{
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: () =>  dispatch({ type: 'too short anecdote, must have length 5 or more' })
  })

  const onCreate = (event) => 
  {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0, id: 100000 * Math.random().toFixed(0) })

    dispatch({ type: `anecdote '${content}' has been created` })
    setTimeout(() => 
    {
      dispatch({ type: '' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
