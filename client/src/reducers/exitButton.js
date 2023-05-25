import { createSlice } from '@reduxjs/toolkit'


const exitButtonSlice = createSlice({
  name: 'exitButton',
  initialState: false,
  reducers: {
    setExitButtonBool(state, action) {
      return action.payload
    }
  }
})

export const { setExitButtonBool } = exitButtonSlice.actions
export default exitButtonSlice.reducer


