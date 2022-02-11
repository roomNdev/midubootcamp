const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

usersRouter.post('',async (req, res,next) => {
  try{
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({ error: 'username and password fields are required' })
    } else if (req.body.username.length <= 3 || req.body.password.length <= 3) {
      return res.status(400)
        .json({ error: 'username and password have to be at least 3 characters long' })
    }
    const passwordHash = await bcrypt.hash(req.body.password,10)
    const user = new User({
      username:req.body.username,
      name:req.body.name,
      passwordHash
    })
      
    const savedUser = await user.save()
    res.json(savedUser)}
  catch (error){next(error)}
}
)

usersRouter.get('',async (request, response,next) => {  
  try{
    const users = await User.find({}).populate('blogs',{
      url: 1,
      title: 1,
      author: 1,
    })
    response.json(users)}
  catch(error){next(error)}
})

module.exports = usersRouter