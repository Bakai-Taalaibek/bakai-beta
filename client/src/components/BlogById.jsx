import { useParams } from "react-router-dom"
import { blogRendered } from "./blogRendered"
import { useQueryClient } from 'react-query'

const BlogById = () => {
  const queryClient = useQueryClient()
  const { blogId } = useParams()

  let results = queryClient.getQueryData('usersBlogs')
  const currentBlog = results.blogs.find(blog => blog.id === blogId)

  const dateTransform = (ISOdate) => {
    const data = new Date(ISOdate)
    return data.toLocaleDateString('ru')
  }

  return (
    <div className="mb-10">
      <div 
        className='ml-8 text-left text-2xl text-slate-800 '>
          Автор: { currentBlog.user.username }, создано: { dateTransform(currentBlog.dateAdded) }
      </div>
      {blogRendered(currentBlog.blogPost)}
    </div>
  )
}

export default BlogById