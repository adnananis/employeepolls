import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveQuestion } from '../features/questionsSlice'
import { useAppDispatch } from '../store'
import type { RootState } from '../store'

const NewQuestion = () => {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authedUser = useSelector((state: RootState) => state.authedUser)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (optionOne && optionTwo && authedUser) {
      dispatch(saveQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser }))
      navigate('/')
    }
  }

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Question</h1>
        <p className="text-lg text-gray-600">Share your "Would You Rather" question with the team</p>
      </div>

      <div className="card form-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Would You Rather...</h2>
            <div className="w-16 h-1 bg-primary-color mx-auto rounded-full"></div>
          </div>

          <div className="form-group">
            <label htmlFor="option-one" className="form-label">
              Option One
            </label>
            <input
              id="option-one"
              type="text"
              placeholder="Enter first option..."
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="text-center text-gray-500 font-medium">OR</div>

          <div className="form-group">
            <label htmlFor="option-two" className="form-label">
              Option Two
            </label>
            <input
              id="option-two"
              type="text"
              placeholder="Enter second option..."
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!optionOne || !optionTwo}
            className="w-full"
          >
            Create Question
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewQuestion