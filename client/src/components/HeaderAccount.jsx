import { NavLink } from 'react-router-dom'
import { ExitButton } from './ExitButton'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
 
const HeaderAccount = () => {
  const exitButtonRef = useRef()
  const user = useSelector((state) => state.user)

  
  if (user) {
    return (
      <div className='flex  items-center'>
        <NavLink  
          to="profile"
          className={ ({ isActive }) => isActive ? activeNavButton : passiveNavButton } >
            Профиль 
        </NavLink>

        <NavLink  
          to="new"
          className={ ({ isActive }) => isActive ? activeNavButton : passiveNavButton } >
            Создать 
        </NavLink>
        
        <span ref={ exitButtonRef }>
        <ExitButton /> 
        </span>
      </div>
    )
  } 
  
  else {
    return (
      <NavLink 
        to="entry"
        className={ ({ isActive }) => isActive ? activeNavButton : passiveNavButton } >
          Войти
      </NavLink>  
    )
  }
}

export default HeaderAccount

const activeNavButton = `
  font-semibold
  text-center
  bg-gray-300 dark:bg-gray-900  
  text-slate-800 text-xl
  mx-1 px-3 py-2`
const passiveNavButton = `
  font-semibold
  text-center
  bg-gray-200 dark:bg-gray-900 
  text-slate-500 hover:text-slate-700 text-xl
  mx-1 px-3 py-2`


