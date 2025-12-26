import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'
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

const createMockStore = (authedUser: string | null = null) => {
  return configureStore({
    reducer: {
      authedUser: authedUserReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      authedUser,
      users: mockUsers,
      questions: {},
    },
  })
}

describe('Nav Component', () => {
  test('should display all expected navigation links when user is authenticated', () => {
    const store = createMockStore('sarahedo')
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    )

    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Leaderboard')).toBeInTheDocument()
    expect(getByText('New Question')).toBeInTheDocument()
    expect(getByText('Logout')).toBeInTheDocument()
  })

  test('should not display navigation links when user is not authenticated', () => {
    const store = createMockStore(null)
    const { queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    )

    expect(queryByText('Home')).not.toBeInTheDocument()
    expect(queryByText('Leaderboard')).not.toBeInTheDocument()
    expect(queryByText('New')).not.toBeInTheDocument()
    expect(queryByText('Logout')).not.toBeInTheDocument()
  })
})
