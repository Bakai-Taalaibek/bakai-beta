import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    'header': '',
    'paragraph': '',
  },
  reducers: {
    blogReset(state) {
      state.header = '',
      state.paragraph = ''
    },
    updateBlogHeader(state, action) {
      state.header = action.payload
    },
    updateBlogParagraph(state, action) {
      state.paragraph = action.payload
    },
    fillBlog(state, action) {
      return action.payload
    },
  }
})

export const { blogReset, blogSet, updateBlogHeader, fillBlog, updateBlogParagraph } = blogSlice.actions
export default blogSlice.reducer