
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('', async (request, response,next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, user: 1})
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
  try{
    if(!request.decodedToken || !request.token || !request.user){
      return response.status(400).json({error:'missing or invalid token'})
    }
    const body = request.body
    const user = await User.findById(request.decodedToken.id)
    const newBlog = {
      title:body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
      comments: []
    }

    const blog = new Blog(newBlog)
    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    const populatedResult = await result
      .populate('user', {username:1 , name:1})
      .execPopulate()

    response.status(201).json(populatedResult.toJSON())}
  catch(error){next(error)}
})

blogRouter.delete('/:id', async (request, response) => {
  if(!request.decodedToken || !request.token || !request.user){
    return response.status(400).json({error:'missing or invalid token'})
  }
  const blogToDelete = await Blog.findById(request.params.id)
  const userId = request.decodedToken.id
  if(userId.toString() === blogToDelete.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()}
  else {response.status(400).json({error:'missing or invalid token'})
  }
})

blogRouter.put('/:id', async (request, response,next) => {
  try {
    const body = request.body

    const blogToUpdate = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    }

    const blogs = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {new:true})
    response.json(blogs)}
  catch(error){next(error)}
})

blogRouter.put('/:id/comments', async (request, response, next) =>{
  try {
    const body = request.body

    const blogToUpdate = {
      comments: body.comments
    }

    const blogs = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {new:true})
    response.json(blogs)}
  catch(error){next(error)}
}
)

module.exports = blogRouter