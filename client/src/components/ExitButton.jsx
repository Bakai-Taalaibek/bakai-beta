import { useNavigate } from 'react-router-dom'
import blogServices from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user'
import { setExitButtonBool } from '../reducers/exitButton'

export const ExitButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleExit = () => {
    setExitButtonBool(false)
    dispatch(setUser(null))
    blogServices.setToken(null)
    navigate('')
  }

  return (
    <div >
      <button 
        className={ exitButtonStyle } 
        onClick={handleExit} >
          Выйти
      </button>
    </div>
  )
}

const exitButtonStyle = `
  w-[90px]
  font-semibold
  bg-sky-100 dark:bg-gray-900 
  text-slate-500 hover:text-slate-700 text-xl
  mx-1 px-3 py-2`

