
const unknownEndpoint = (error,request, response) => {
  response.status(404).send({ error: `${error}` })
}
   
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Improper id format' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
    
  next(error)
}
module.exports ={unknownEndpoint, errorHandler}