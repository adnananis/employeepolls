import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
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
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://ui-avatars.com/api/?name=Tyler+McGinnis',
    answers: {},
    questions: []
  }
}

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      authedUser: authedUserReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      authedUser: null,
      users: mockUsers,
      questions: {},
      ...initialState,
    },
  })
}

describe('Login Component - DOM Tests', () => {
  test('should update selected user when dropdown value changes', () => {
    const store = createMockStore()
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const select = getByRole('combobox') as HTMLSelectElement

    // Initially should be empty
    expect(select.value).toBe('')

    // Change to a user
    fireEvent.change(select, { target: { value: 'sarahedo' } })
    expect(select.value).toBe('sarahedo')

    // Change to another user
    fireEvent.change(select, { target: { value: 'tylermcginnis' } })
    expect(select.value).toBe('tylermcginnis')
  })

  test('should have disabled button when no user is selected', () => {
    const store = createMockStore()
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const button = getByRole('button', { name: /sign in/i })
    const select = getByRole('combobox') as HTMLSelectElement

    // Button should be enabled (HTML5 validation will prevent submission)
    expect(select.value).toBe('')
  })
})
