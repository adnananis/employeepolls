import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import usersReducer from './features/usersSlice'
import questionsReducer from './features/questionsSlice'
import authedUserReducer from './features/authedUserSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    authedUser: authedUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()