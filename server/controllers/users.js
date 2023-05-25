const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { blogPosts: 1, dateAdded: 1, id: 1 })
    return response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body
  
    if (username === undefined || password === undefined) {
      return response.status(400).json({ error: 'content missing' })
    } else if (password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 letters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      passwordHash,
      blogs: []
    })
    
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(201)
    .send({ token, username: savedUser.username })
})

module.exports = usersRouter