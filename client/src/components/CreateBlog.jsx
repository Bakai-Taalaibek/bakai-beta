import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { blogReset, updateBlogParagraph, updateBlogHeader } from '../reducers/blogReducer'
import { blogHelperReset } from '../reducers/blogHelperReducer'
import { blogRendered } from './blogRendered'
import { useQuery } from 'react-query'

const CreateBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blog)
  const user = useSelector(state => state.user)
  const blogHelper = useSelector((state) => state.blogHelper)
  const page = useSelector(state => state.page)
  const { refetch } = useQuery('usersBlogs', () => blogService.getUsersBlogs(user.username))

  const handleSubmit = async () => {
    await blogService.create(blog)
    queryClient.invalidateQueries(['blogs', page])
    queryClient.invalidateQueries('usersBlogs')
    dispatch(blogReset())
    console.log(blog)
    refetch()
  }

  const handleSaveChanges = async () => {
    const newBlog = { dateAdded: blogHelper.date, blogPost: blog }
    await blogService.update(newBlog, blogHelper.id)
    queryClient.invalidateQueries(['blogs', page])
    queryClient.invalidateQueries('usersBlogs')
    dispatch(blogHelperReset())  
    dispatch(blogReset())     
    refetch()
  }
  console.log(blogHelper)
  return (
    <div >
      <div className='font-semibold text-3xl text-blue-800 mb-3'>Создать блог</div>

      <div className='flex items-center m-2 text-lg mb-8'>
        <span className='font-bold '>Заголовок:</span>         
        <textarea className={ input }
          value={ blog.header }
          onChange={(event) => dispatch(updateBlogHeader(event.target.value))}
        ></textarea>
      </div>

      <div className='flex flex-wrap justify-center items-center m-2 text-lg'>
        <span className='font-bold '>Содержание:</span>      
        <textarea className={ input }
          placeholder='Введите текст блога'
          value={ blog.paragraph }
          onChange={(event) => dispatch(updateBlogParagraph(event.target.value))}
        ></textarea>
      </div>

      <button 
        onClick={ () => dispatch(blogReset()) } 
        className={ button + 'bg-red-600 text-gray-50'}>
          Обнулить
      </button>
      { blogHelper.status 
        ? <button 
            className={ button + 'bg-cyan-400 text-gray-50'}
            onClick={handleSaveChanges}>
              Сохранить изменения
          </button>
        : <button 
            className={ button + 'bg-green-600 text-gray-50'}
            onClick={handleSubmit}>
              Сохранить
          </button> 
      }
      
      { blogRendered(blog) }
    </div>
  ) 
}
  

export default CreateBlog

const button = `
  bg-gray-200 
  font-semibold text-gray-800 hover:text-gray-600 
  p-2 m-1 `


const input = `
w-7/12 min-w-[calc(250px)] flex-grow
border border-gray-700
mx-2 p-1`






