require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
// const morgan = require('morgan')

// morgan.token('data', (req) => {
//   return req.method === 'POST'
//     ? JSON.stringify(req.body)
//     : null
// })

app.use(express.json())
app.use(express.static('build'))
// app.use(morgan((tokens, req, res) => {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     tokens.data(req, res)
//   ].join(' ')
// }))


app.post('/api/persons', (request, response,next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.get('/api/persons', (request, response,next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()})
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const personToUpdate = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id,personToUpdate,{ new: true })
    .then(resolve => response.json(resolve))
    .catch(error => next(error))
})


const unknownEndpoint = (error,request, response) => {
  response.status(404).send({ error: `${error}` })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Improper id format' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})