require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/persons');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => 
    {
      const dateStamp = new Date();
      response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${dateStamp}</p>`)
    })
    .catch(error => next(error))
})
  
app.get('/api/persons', (request, response, next) => {
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

app.post('/api/persons', (request, response, next) => {
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

    !Person.findOne({name: person.name}).then((result) =>
    {
      if (result === null)
      {
        person.save()
          .then(savedPerson => response.json(savedPerson)) 
          .catch(error => next(error))
      }
      else
      {
        return response.status(400).json({ error: `${person.name} is already included in the phonebook.` });
      }
    })
  }
})

app.put('/api/persons/:id', (request, response, next) => 
{
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))  
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(result === null ? 404 : 204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') 
  {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})