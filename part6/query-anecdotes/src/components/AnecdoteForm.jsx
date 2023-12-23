import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => 
{
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const onCreate = (event) => 
  {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0, id: 100000 * Math.random().toFixed(0) })
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
