import axios from 'axios'
import { baseUrl } from '../utilities/url'

const fullUrl = `${baseUrl}/api/login`

const loginService = async credentials => {
  const response = await axios.post(fullUrl, credentials)
  return response.data
}

export default loginService