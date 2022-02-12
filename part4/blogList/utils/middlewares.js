const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {JWT_SEC} = require('../utils/config')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else{
    request.token = null
  }

  try{
    const decodedToken = jwt.verify(request.token, JWT_SEC)
    request.decodedToken = decodedToken
  }
  catch(error){request.decodedToken = null}
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else{
    request.token = null
  }
  try{
    const decodedToken = jwt.verify(request.token, JWT_SEC)
    const user = await User.findById(decodedToken.id)
    request.user = user
  }
  catch(error){
    request.decodedToken = null
    request.user = null
  }
  next()
}


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
   
const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Improper id format' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'missing or invalid token'})
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({error: 'token expired'})}
    
  next(error)
}
module.exports ={unknownEndpoint, errorHandler, tokenExtractor, userExtractor}