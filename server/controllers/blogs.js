const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const blogsPerPage = 5

blogsRouter.get('/:page', async (request, response) => {
  const blogs = await Blog.find({})
                          .sort({ _id: -1 })
                          .skip(blogsPerPage * (request.params.page - 1))
                          .limit(blogsPerPage)
                          .populate('user', { username: 1, id: 1 })

  const numberOfBlogs = await Blog.find({}).count()
  const pages = Math.ceil(numberOfBlogs / blogsPerPage) 

  return response.json({ blogs, pages })
})
 

blogsRouter.get('/username/:username', async (request, response) => {
  const user = await User.findOne({ username: request.params.username })
  const blogs = await Blog.find({user: user._id})
                          .sort({ _id: -1 })
                          .populate('user', { username: 1, id: 1 })

  return response.json({ blogs })
})


blogsRouter.get('/id/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    return response.json(blog)
  } else {
    return response.status(404).end()
  }
})

  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (
    body === undefined || 
    body === '' || 
    body === []
  ) {
    return response.status(400).end()
  } else if (!request.token) {
    return response.status(401).end()
  }

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const initialBlog = {
    blogPost: body,
    dateAdded: new Date(),
    user: user._id
  }

  const blog = new Blog(initialBlog)
  const savedBlog = await blog.save()

  const userFromDatabase = await User.findById(user._id)
  
  userFromDatabase.blogs = userFromDatabase.blogs.concat(blog._id)
  await userFromDatabase.save()

  response.status(201).json(savedBlog)
})
 
 
blogsRouter.delete('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndRemove(request.params.id)

  let userFromDatabase = await User.findById(user._id)
  const updatedUserBlogs = userFromDatabase.blogs.filter(blog => blog.toString() !== request.params.id)
  userFromDatabase.blogs = updatedUserBlogs

  await userFromDatabase.save()
  response.status(204).end()
})
 
  
blogsRouter.put('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!user || user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
 
  const initialBlog = {
    blogPost: request.body.blogPost,
    dateAdded: request.body.dateAdded,
    user: user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, initialBlog, { new: true })
  response.status(204).json(updatedBlog)
})
  
module.exports = blogsRouter  