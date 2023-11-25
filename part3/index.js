require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons');

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
  Person.find({}).then(persons => 
    {
      const dateStamp = new Date();
      response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${dateStamp}</p>`)
    })
    .catch(error => next(error))
})
  
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person) 
  })
  .catch(error => next(error))
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
      const person = new Person({
        name: body.name,
        number: body.number
      })

    person.save()
      .then(savedPerson => response.json(savedPerson)) 
      .catch(error => next(error))
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})