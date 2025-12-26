import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const AUTHER_USER_KEY = 'authedUser'

const getInitialState = (): string | null => {
  try {
    const stored = localStorage.getItem(AUTHER_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: getInitialState(),
  reducers: {
    setAuthedUser: (_, action: PayloadAction<string | null>) => {
      const userId = action.payload
      try {
        if (userId) {
          localStorage.setItem(AUTHER_USER_KEY, JSON.stringify(userId))
        } else {
          localStorage.removeItem(AUTHER_USER_KEY)
        }
      } catch {
        // Ignore localStorage errors
      }
      return userId
    },
  },
})

export const { setAuthedUser } = authedUserSlice.actions
export default authedUserSlice.reducer