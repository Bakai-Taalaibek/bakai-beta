import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/user'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username, password,
      })
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      navigate('/')
    }
    catch (exeption) {
      console.log('Error while trying to log in')
    }
  }

  return (
    <div id='superid' className='ml-1 font-serif text-slate-800 '>
      <form className='[&>*]:flex [&>*]:justify-between [&>*]:items-center '
            onSubmit={ handleLogin }>
        <div>
          Логин
          <input  className={ formField }
                  type='text'
                  value={ username }
                  name='Username'
                  onChange={({ target }) => setUsername(target.value)}/>
        </div>

        <div>
          Пароль
          <input  className={ formField }
                  type='password'
                  value={ password }
                  name='Password'
                  onChange={({ target }) => setPassword(target.value)}/>
        </div>
        
        <button className={ button } type='submit'>Войти</button>
      </form>
    </div>
  )
}
export default Login

const formField = `
  m-2 
  border hover:border-blue-300 focus:outline-none focus:border-blue-600   
  shadow rounded`

const button = `
  px-2 py-1 m-2
  text-white font-bold
  bg-blue-500 hover:bg-blue-700 
  rounded shadow-md`