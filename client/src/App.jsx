import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/user'

function App() {
  const page = useSelector(state => state.page)
  const dispatch = useDispatch()

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')   
    if (loggedUserJSON) {      
      const storedUser = JSON.parse(loggedUserJSON)      
      dispatch(setUser(storedUser))      
      blogService.setToken(storedUser.token)    
    }  
  }, [])

  const { isLoading } = useQuery(['blogs', page], () => blogService.getBlogs(page))  

  return (
    <div>
      <Header/>
      <div className={ body }>
        <div className={ contentArea }>
          { isLoading
            ? <div className='text-3xl text-slate-700 mt-10'>Loading...</div>
            : <Outlet />}
        </div>
      </div>
    </div>

  );
}

export default App;

const body = `
  h-max min-h-screen
  flex justify-center
  bg-slate-500 dark:bg-slate-700  `;

const contentArea = `
  w-full max-w-screen-lg
  bg-white dark:bg-slate-900 
  text-center dark:text-slate-200 
  pt-5 `;
