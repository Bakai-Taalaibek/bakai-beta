import { Link } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { setPage } from '../reducers/page'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

const BlogList = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)
  const cachedResult = queryClient.getQueryData(['blogs', page])
  const [ query, setQuery ] = useState('')
  const [ filteredBlogs, setFilteredBlogs ] = useState(cachedResult.blogs)

  useEffect(() => {
    setFilteredBlogs(cachedResult.blogs)
  }, [page])

  const dateTransform = (ISOdate) => {
    const data = new Date(ISOdate)
    return data.toLocaleDateString('ru')
  }

  const handlePageChange = (number) => {
    dispatch(setPage(number))
    queryClient.invalidateQueries(['blogs', page])
  }

  const Buttons = () => {
    const numberOfButtons = Array.from(Array(cachedResult.pages).keys())
    console.log(cachedResult.pages)
    return (
      numberOfButtons.map(number => {
        return (
          <button 
            className='px-5 py-2 bg-slate-200 m-1' 
            onClick={ () => handlePageChange(number + 1) }
            key={ number } > { number + 1 } </button>
        )
      })
    )
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)

    const filteredArray = cachedResult.blogs.filter(blog => {
      return blog.blogPost.header.toLowerCase().includes(event.target.value.toLowerCase()) 
      || blog.blogPost.paragraph.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredBlogs(filteredArray)
  }

  if (cachedResult !== undefined) {
    return (
      <div>

        <span>Поиск на странице</span>
        <input className='w-[95%] border border-slate-800 mx-10' value={ query } onChange={ handleQuery }/>

        < Buttons />
        { filteredBlogs.map((blog, index) => {
          return (
            <div className={ oneBlog } key={ index }>

              <div className='text-3xl font-bold text-blue-800' >
                { blog.blogPost.header }
              </div>

              <div >
                <span 
                  className='text-md'>
                    Автор: { blog.user.username }, создано: { dateTransform(blog.dateAdded) }
                </span> 
                <Link to={`blog/${blog.id}`} className='float-right text-blue-700 font-semibold'> 
                  Подробнее
                </Link>
              </div>

            </div>
          )
        }) }
        < Buttons />
      </div>
    )
  }

}

export default BlogList

const oneBlog =`
  w-10/12 
  flex flex-col
  shadow-lg 
  rounded-md 
  bg-sky-50 
  m-2 my-4 mx-auto p-1 [&>*]:m-2`