import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @ts-ignore
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_Data'
import type { Questions } from '../types'

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions()
  return questions as Questions
})

export const saveQuestion = createAsyncThunk('questions/saveQuestion', async (question: { optionOneText: string, optionTwoText: string, author: string }) => {
  const q = await _saveQuestion(question)
  return q
})

export const saveQuestionAnswer = createAsyncThunk('questions/saveAnswer', async ({ authedUser, qid, answer }: { authedUser: string, qid: string, answer: 'optionOne' | 'optionTwo' }) => {
  await _saveQuestionAnswer({ authedUser, qid, answer })
  return { authedUser, qid, answer }
})

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {} as Questions,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (_, action) => {
      return action.payload
    })
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload
    })
    builder.addCase(saveQuestionAnswer.fulfilled, (state, action) => {
      const { qid, answer } = action.payload
      state[qid][answer].votes.push(action.payload.authedUser)
    })
  },
})

export default questionsSlice.reducer