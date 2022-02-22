// import { configureStore } from '@reduxjs/toolkit'
import {combineReducers, createStore } from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducers = combineReducers({
      anecdotes: anecdoteReducer,
      notification: notificationReducer,
      filter: filterReducer,
    })

const store = createStore(reducers)

export default store