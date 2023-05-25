import { createSlice } from '@reduxjs/toolkit'

const blogHelperSlice = createSlice({
  name: 'blogHelper',
  initialState: {
		'status': false,
		'date': '',
		'id': ''
	},
  reducers: {
    setBlogHelper(state, action) {
      return action.payload
    },
    blogHelperReset(state) {
      state.status = false,
      state.date = '',
      state.id = ''
    }
  }
})

export const { setBlogHelper, blogHelperReset } = blogHelperSlice.actions
export default blogHelperSlice.reducer