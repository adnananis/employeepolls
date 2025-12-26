import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import NewQuestion from './NewQuestion'
import authedUserReducer from '../features/authedUserSlice'
import usersReducer from '../features/usersSlice'
import questionsReducer from '../features/questionsSlice'

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://ui-avatars.com/api/?name=Sarah+Edo',
    answers: {},
    questions: []
  }
}

const createMockStore = () => {
  return configureStore({
    reducer: {
      authedUser: authedUserReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      authedUser: 'sarahedo',
      users: mockUsers,
      questions: { questions: {}, loading: false },
    },
  })
}

describe('NewQuestion Component', () => {
  test('should update form inputs when user types', () => {
    const store = createMockStore()
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    )

    const optionOneInput = getByPlaceholderText(/enter first option/i) as HTMLInputElement
    const optionTwoInput = getByPlaceholderText(/enter second option/i) as HTMLInputElement

    // Initially empty
    expect(optionOneInput.value).toBe('')
    expect(optionTwoInput.value).toBe('')

    // Type into option one
    fireEvent.change(optionOneInput, { target: { value: 'Learn React' } })
    expect(optionOneInput.value).toBe('Learn React')

    // Type into option two
    fireEvent.change(optionTwoInput, { target: { value: 'Learn Vue' } })
    expect(optionTwoInput.value).toBe('Learn Vue')
  })

  test('should have submit button disabled when form is incomplete', () => {
    const store = createMockStore()
    const { getByRole, getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    )

    const button = getByRole('button', { name: /create question/i })
    
    // Initially disabled (both fields empty)
    expect(button).toBeDisabled()

    // Fill only first option
    const optionOneInput = getByPlaceholderText(/enter first option/i)
    fireEvent.change(optionOneInput, { target: { value: 'Option 1' } })
    expect(button).toBeDisabled()

    // Fill both options
    const optionTwoInput = getByPlaceholderText(/enter second option/i)
    fireEvent.change(optionTwoInput, { target: { value: 'Option 2' } })
    expect(button).not.toBeDisabled()
  })
})
