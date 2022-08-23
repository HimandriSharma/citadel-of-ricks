import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({reducer:rootReducer,middleware:[thunk]})

export default store