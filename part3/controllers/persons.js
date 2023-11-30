const personsRouter = require('express').Router()
const Person = require('../models/persons')

personsRouter.get('/info', (request, response, next) => {
    Person.find({}).then(persons =>
    {
        const dateStamp = new Date()
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${dateStamp}</p>`)
    })
        .catch(error => next(error))
})
  
personsRouter.get('/', (request, response, next) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(error => next(error))
})
  
personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => { response.json(person) })
        .catch(error => next(error))
})
  
personsRouter.post('/', (request, response, next) => {
    const body = request.body
    let errorString = ''
  
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
  
      !Person.findOne({ name: person.name }).then((result) =>
      {
        if (result === null)
        {
          person.save()
            .then(savedPerson => response.json(savedPerson))
            .catch(error => next(error))
        }
        else
        {
          return response.status(400).json({ error: `${person.name} is already included in the phonebook.` })
        }
      })
    }
})
  
personsRouter.put('/:id', (request, response, next) =>
{
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})
  
personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(result === null ? 404 : 204).end())
        .catch(error => next(error))
})

module.exports = personsRouter