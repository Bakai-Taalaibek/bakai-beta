import { configureStore } from '@reduxjs/toolkit'
import blogHelperReducer from '../reducers/blogHelperReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/user'
import pageReducer from '../reducers/page'
import exitButtonReducer from '../reducers/exitButton'


export const store = configureStore({  
  reducer: {    
    blog: blogReducer,    
    blogHelper: blogHelperReducer,
    user: userReducer,
    page: pageReducer,
    exitButton: exitButtonReducer,
  }
})