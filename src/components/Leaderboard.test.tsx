import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import Leaderboard from './Leaderboard'
import authedUserReducer from '../features/authedUserSlice'
import usersReducer from '../features/usersSlice'
import questionsReducer from '../features/questionsSlice'
import type { Users } from '../types'

const mockUsers: Users = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://ui-avatars.com/api/?name=Sarah+Edo',
    answers: {
      'q1': 'optionOne',
      'q2': 'optionTwo',
      'q3': 'optionOne'
    },
    questions: ['q1', 'q2']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://ui-avatars.com/api/?name=Tyler+McGinnis',
    answers: {
      'q1': 'optionOne'
    },
    questions: ['q3']
  },
  mtsamis: {
    id: 'mtsamis',
    name: 'Mike Tsamis',
    avatarURL: 'https://ui-avatars.com/api/?name=Mike+Tsamis',
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

describe('Leaderboard Component', () => {
  test('should display correct user names, questions asked, and questions answered', () => {
    const store = createMockStore()
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    )

    // Check Sarah Edo (score: 5 - 2 questions + 3 answers)
    expect(getByText('Sarah Edo')).toBeInTheDocument()
    const sarahRow = getByText('Sarah Edo').closest('tr')
    expect(sarahRow).toHaveTextContent('2') // questions asked
    expect(sarahRow).toHaveTextContent('3') // questions answered
    expect(sarahRow).toHaveTextContent('5') // total score

    // Check Tyler McGinnis (score: 2 - 1 question + 1 answer)
    expect(getByText('Tyler McGinnis')).toBeInTheDocument()
    const tylerRow = getByText('Tyler McGinnis').closest('tr')
    expect(tylerRow).toHaveTextContent('1') // questions asked
    expect(tylerRow).toHaveTextContent('1') // questions answered
    expect(tylerRow).toHaveTextContent('2') // total score

    // Check Mike Tsamis (score: 0)
    expect(getByText('Mike Tsamis')).toBeInTheDocument()
    const mikeRow = getByText('Mike Tsamis').closest('tr')
    expect(mikeRow).toHaveTextContent('0') // questions asked
    expect(mikeRow).toHaveTextContent('0') // questions answered
    expect(mikeRow).toHaveTextContent('0') // total score
  })

  test('should display users in descending order by total score', () => {
    const store = createMockStore()
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    )

    const rows = getAllByRole('row')
    // Skip header row, check data rows
    const dataRows = rows.slice(1)
    
    // First user should be Sarah (highest score: 5)
    expect(dataRows[0]).toHaveTextContent('Sarah Edo')
    
    // Second user should be Tyler (score: 2)
    expect(dataRows[1]).toHaveTextContent('Tyler McGinnis')
    
    // Third user should be Mike (score: 0)
    expect(dataRows[2]).toHaveTextContent('Mike Tsamis')
  })
})
