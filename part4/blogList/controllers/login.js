const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')
const {JWT_SEC} = require('../utils/config')

loginRouter.post('', async (req, res,next) => {
  const body = req.body
  const {username, password} = body
  try{
    const user = await User.findOne({username})
    const passwordCorrect = user === null 
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if(!(passwordCorrect && user)) {
      res
        .status(401)
        .json({error: 'Invalid user or password'})
    }
    const userForToken = {
      id:user._id,
      username: user.username}

    const token = jwt.sign(userForToken,JWT_SEC,{
      expiresIn: 60*60*24*7//one week
    })

    res.send({
      name: user.name,
      username: user.username,
      token
    })
  }
  catch(error) {next(error)}
})

module.exports = loginRouter