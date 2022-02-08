const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middlewares = require('./utils/middlewares')

mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middlewares.unknownEndpoint) 
app.use(middlewares.errorHandler)
  

module.exports = app