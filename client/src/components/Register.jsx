import { useState } from 'react'
import register from '../services/register'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegistration = async (event) => {
    event.preventDefault()
    if (password !== passwordConfirmation) {
      return alert('Пароли не совпадают')
    }
    try {
      const user = await register({
        username, password
      })
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      setPasswordConfirmation('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      navigate('/')      
    }
    catch (exeption) {
      console.log('Error while trying to register')
    }    
  }

  return (
    <div id='superid' className='ml-1 font-serif text-slate-800 '>
      <form className='[&>*]:flex [&>*]:justify-between [&>*]:items-center ' 
            onSubmit={ handleRegistration }>
        <div>
          Логин
          <input  className={ formField }
                  type='text'
                  value={ username }
                  name='Username'
                  onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Пароль
          <input  className={ formField }
                  type='password'
                  value={ password }
                  name='Password'
                  onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div>
          Подтвердите пароль
          <input  className={ formField }
                  type='password'
                  value={ passwordConfirmation }
                  name='Password'
                  onChange={({ target }) => setPasswordConfirmation(target.value)}
          />
        </div>
        
        <button className={ button } type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  )
}
export default Register

const formField = `
  w-40
  m-2 
  border hover:border-blue-300 focus:outline-none focus:border-blue-600   
  shadow rounded`

const button = `
  px-2 py-1 m-2
  text-white font-bold
  bg-blue-500 hover:bg-blue-700 
  rounded shadow-md`