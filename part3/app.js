require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { dbName: 'phonebook' })
  .then(() =>
    logger.info('connected to MongoDB')
  )
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('dist'))

app.use('/api/persons/', personsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app