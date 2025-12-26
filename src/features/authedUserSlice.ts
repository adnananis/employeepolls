import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: null as string | null,
  reducers: {
    setAuthedUser: (_, action: PayloadAction<string | null>) => {
      return action.payload
    },
  },
})

export const { setAuthedUser } = authedUserSlice.actions
export default authedUserSlice.reducer