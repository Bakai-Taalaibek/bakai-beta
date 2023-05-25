import { useEffect, useState } from 'react'
import Register from './Register'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Entry = () => {
  const [registrationBool, setRegistrationBool] = useState(false)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className={ mainContainer }>
      <div className={ registrationBool ? passiveTab : activeTab }> 
        <button onClick={() => setRegistrationBool(false)}>Авторизироваться</button>      
      </div>   
      <div className={ registrationBool ? activeTab : passiveTab }> 
        <button onClick={() => setRegistrationBool(true)}>Зарегистрироваться</button>      
      </div>    
       <div className='w-[350px]'>
        { registrationBool 
          ? <Register />
          : <Login /> }
      </div>
    </div>
  )
}

const mainContainer = `
  w-[calc(100%-1rem)] sm:max-w-md h-80 shadow 
  flex-wrap flex justify-evenly
  bg-white dark:bg-gray-800 
  rounded-lg dark:border dark:border-gray-700
  mx-auto md:mt-5 xl:p-0  `

const activeTab = `
  flex items-center justify-center grow 
  h-10
  text-blue-800 
  bg-white  `

const passiveTab = `
  flex items-center justify-center grow 
  h-10
  text-blue-800 
  bg-gray-100 `