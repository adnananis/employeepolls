import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import QuestionDetails from './QuestionDetails'
import authedUserReducer from '../features/authedUserSlice'
import usersReducer from '../features/usersSlice'
import questionsReducer from '../features/questionsSlice'

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://ui-avatars.com/api/?name=Sarah+Edo',
    answers: {
      'question1': 'optionOne' as const
    },
    questions: ['question1']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://ui-avatars.com/api/?name=Tyler+McGinnis',
    answers: {
      'question1': 'optionTwo' as const
    },
    questions: []
  },
  mtsamis: {
    id: 'mtsamis',
    name: 'Mike Tsamis',
    avatarURL: 'https://ui-avatars.com/api/?name=Mike+Tsamis',
    answers: {
      'question1': 'optionTwo' as const
    },
    questions: []
  }
}

const mockQuestions = {
  question1: {
    id: 'question1',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'Build our new application with JavaScript'
    },
    optionTwo: {
      votes: ['tylermcginnis', 'mtsamis'],
      text: 'Build our new application with TypeScript'
    }
  }
}

const createMockStore = (authedUser: string | null = 'sarahedo') => {
  return configureStore({
    reducer: {
      authedUser: authedUserReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      authedUser,
      users: mockUsers,
      questions: {
        questions: mockQuestions,
        loading: false
      },
    },
  })
}

describe('QuestionDetails Component', () => {
  test('should display correct voting percentages for answered poll', () => {
    const store = createMockStore('sarahedo')
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1']}>
          <Routes>
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Total votes: 3 (1 for optionOne, 2 for optionTwo)
    // optionOne: 1/3 = 33.3%
    // optionTwo: 2/3 = 66.7%

    expect(getByText('1 votes (33.3%)')).toBeInTheDocument()
    expect(getByText('2 votes (66.7%)')).toBeInTheDocument()
  })

  test('should indicate which option the user voted for', () => {
    const store = createMockStore('sarahedo')
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1']}>
          <Routes>
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Sarah voted for optionOne
    const yourChoiceElements = getByText('✓ Your choice')
    expect(yourChoiceElements).toBeInTheDocument()
  })

  test('should display total votes count', () => {
    const store = createMockStore('sarahedo')
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1']}>
          <Routes>
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(getByText('Total votes: 3')).toBeInTheDocument()
  })
})
