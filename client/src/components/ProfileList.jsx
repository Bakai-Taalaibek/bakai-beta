import { useQueryClient, useMutation } from 'react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogHelper } from '../reducers/blogHelperReducer'
import { fillBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'


const ProfileList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const page = useSelector(state => state.page)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const { refetch } = useQuery('usersBlogs', () => blogService.getUsersBlogs(user.username))

  let data = queryClient.getQueryData('usersBlogs')

  const newMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs', page])
      queryClient.invalidateQueries('usersBlogs')
      refetch()
    }
  })

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены что хотите удалить данный блог?')) {
      newMutation.mutate(id)
    }
  }

  const handleEdit = async (blog) => {
    dispatch(fillBlog(blog.blogPost))
    dispatch(setBlogHelper({ status:true, date:blog.dateAdded, id:blog.id }))
    navigate('/new')
  }

  const dateTransform = (ISOdate) => {
    const data = new Date(ISOdate)
    return data.toLocaleDateString('ru')
  }

  return (
    <div>
      <>
        <div className='text-4xl text-green-700 mt-5 font-bold'>Ваши блоги:</div>

        { data.blogs.map((blog) => {
          return (
            <div className='mb-4 mt-1 flex justify-center items-center flex-wrap md:flex-nowrap' key={ blog.id }>
              <div className={ oneBlog } >
                <Link 
                  className='text-3xl font-bold text-blue-800' 
                  to={`blog/${blog.id}`} >
                    { blog.blogPost.header }
                </Link>
                <span 
                  className='text-md'>
                    Автор: { blog.user.username }, создано: { dateTransform(blog.dateAdded) }
                </span>
              </div> 

              <button 
                className='bg-orange-300 mx-2 h-14 px-2' 
                onClick={ () => handleEdit(blog) }  >Редактировать</button>
              <button 
                className='bg-red-300 mx-2 h-14 px-2' 
                onClick={ () => handleDelete(blog.id) } >Удалить</button>
            </div>
          )
        }) }
      </>
    </div>
  )
}

export default ProfileList

const oneBlog =`
  w-11/12 md:min-w-[calc(450px)] 
  flex flex-col 
  shadow-lg 
  rounded-md 
  bg-sky-50 
  my-2 mx-5  p-2 [&>*]:m-2`