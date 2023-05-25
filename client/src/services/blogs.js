import axios from 'axios'
import { baseUrl } from '../utilities/url'

const fullUrl = `${baseUrl}/api/blogs`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getBlogs = async (page) => {
  const response = await axios.get(`${fullUrl}/${page}`)
  return response.data
}

const getUsersBlogs = async (username) => {
  const response = await axios.get(`${fullUrl}/username/${username}`)
  return response.data
}

const getById = async (blogId) => {
  const response = await axios.get(`${fullUrl}/id/${blogId}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  const response = await axios.post(fullUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${fullUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${fullUrl}/${blogId}`, config)
}

const blogService = { getBlogs, getUsersBlogs, getById, create, update, remove, setToken }

export default blogService