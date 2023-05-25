const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const jwt = require('jsonwebtoken')
const path = require('path')
require('express-async-errors')

logger.info('Connecting to MongoDB')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then( () => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })
  
app.use(cors())
app.use(express.json())
 
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('dist'))
app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, './dist/index.html'), (error) => {
    if (error) {
      response.status(500).send(error)
    }
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app