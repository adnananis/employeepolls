import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
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
      questions: { questions: {}, loading: false },
      ...initialState,
    },
  })
}

describe('Login Component', () => {
  test('should match snapshot', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should display user select dropdown, and login button', () => {
    const store = createMockStore()
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    expect(getByLabelText(/select user/i)).toBeInTheDocument()
    expect(getByRole('combobox')).toBeInTheDocument()
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
})
