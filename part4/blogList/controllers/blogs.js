
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', async (request, response,next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)}
  catch(error){next(error)}
})


blogRouter.get('/:id', async (request, response,next) => {
  try {
    const blogs = await Blog.findById(request.params.id)
    response.json(blogs)}
  catch(error){next(error)}
})
  
  
blogRouter.post('', async (request, response,next) => {
  let blog = new Blog(request.body)
  if(!blog.likes){
    blog['likes'] = 0
  }
  try{
    const result = await blog.save()
    response.status(201).json(result)}
  catch(error){next(error)}
})

blogRouter.delete('/:id', async (request, response,next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()}
  catch(error){next(error)}
})

blogRouter.put('/:id', async (request, response,next) => {
  try {
    const body = request.body

    const blogToUpdate = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const blogs = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {new:true})
    response.json(blogs)}
  catch(error){next(error)}
})

module.exports = blogRouter