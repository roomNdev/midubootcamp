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


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(err => next(err))
  })

 
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => response.json(persons))
  .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person=>response.json(person))
    .catch(err => next(err))
  })

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(()=>{
      response.status(204).end()})
      .catch(err => next(err))
  })

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  personToUpdate = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id,personToUpdate,{ new: true })
    .then(resolve => response.json(resolve))
    .catch(err => next(err))
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})