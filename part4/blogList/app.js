const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const middlewares = require('./utils/middlewares')
const usersRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())
app.use(middlewares.tokenExtractor)
app.use('/api/blogs',middlewares.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const resetRouter = require('./controllers/reset')
  app.use('/api/reset', resetRouter)
}
app.use(middlewares.unknownEndpoint) 
app.use(middlewares.errorHandler)

module.exports = app