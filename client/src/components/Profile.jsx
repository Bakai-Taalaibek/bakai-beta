import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.user)

  const { isLoading } = useQuery('usersBlogs', () => blogService.getUsersBlogs(user.username)) 

  return (
    <div>      
      { isLoading
        ? <div className='text-3xl text-slate-700 mt-10'>Loading...</div>
        : <Outlet />}  
    </div>
  )
}

export default Profile