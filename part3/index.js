require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * 1000);
}

const morganFn = morgan(function (tokens, req, res) {
  const requestType = tokens.method(req, res),
  body = requestType === 'POST' ? JSON.stringify(req.body) : '';
  
tokens.body
  return [
    requestType,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    body
  ].join(' ')
})

app.use(cors())
app.use(express.json())
app.use(morganFn)
app.use(express.static('dist'))

app.get('/info', (request, response) => {
    const numberOfPeople = persons.length;
    const dateStamp = new Date();
    response.send(`<p>Phonebook has info for ${numberOfPeople} people</p><p>${dateStamp}</p>`)
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
    {
      response.json(person);
    }
    else
    {
      response.status(404).end();
    }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  let errorString = '';

  if (!body.name)
  {
    errorString += 'name missing.'
  }
  if (!body.number)
  {
    errorString += 'number missing.'
  }

  if (errorString !== '')
  {
    return response.status(400).json({ 
      error: errorString 
    })
  }
  else
  {
    if (persons.find(p => p.name === body.name))
    {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    else
    {
      const person = {
        id: generateId(),
        name: body.name,
        number: body.number
      }

      persons = persons.concat(person)
      response.json(person)
    }
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})