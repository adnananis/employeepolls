import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @ts-ignore
import { _getUsers } from '../_Data'
import type { Users } from '../types'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await _getUsers()
  return users as Users
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {} as Users,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload
    })
    // @ts-ignore
    builder.addMatcher(
      (action) => action.type === 'questions/saveQuestion/fulfilled',
      (state, action) => {
        // @ts-ignore
        const { author, id } = action.payload
        state[author].questions.push(id)
      }
    )
    // @ts-ignore
    builder.addMatcher(
      (action) => action.type === 'questions/saveAnswer/fulfilled',
      (state, action) => {
        // @ts-ignore
        const { authedUser, qid, answer } = action.payload
        state[authedUser].answers[qid] = answer
      }
    )
  },
})

export default usersSlice.reducer