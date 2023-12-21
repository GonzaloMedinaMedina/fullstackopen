import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdoteId) => {
  const anecdoteUrl = `${baseUrl}/${anecdoteId}`;
  const response = await axios.get(anecdoteUrl)

  const anecdoteToVote = response.data;
  anecdoteToVote.votes++;

  const result = await axios.put(anecdoteUrl, anecdoteToVote);
  return result.data;
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export default {
  getAll: getAll,
  create: create,
  vote: vote
}