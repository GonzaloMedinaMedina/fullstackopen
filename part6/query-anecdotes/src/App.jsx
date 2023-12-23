import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote} from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => 
{
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const handleVote = (anecdote) => 
  {
    anecdote.votes++
    voteAnecdoteMutation.mutate({ ...anecdote })
    
    dispatch({ type: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => 
    {
      dispatch({ type: '' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) 
  {
    return <div>loading data...</div>
  }
  else if (result.isError) 
  {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
