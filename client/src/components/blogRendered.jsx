export const blogRendered = (blog) => {
  return (
    <>
      <h2 className='font-semibold text-5xl my-10 mx-5'>{blog.header}</h2>
      <div className='text-left mx-6 my-5 text-xl'>{blog.paragraph}</div>
    </>
  )
}