import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { RootState } from '../store'

const Home = () => {
  const [showAnswered, setShowAnswered] = useState(false)
  const authedUser = useSelector((state: RootState) => state.authedUser)
  const users = useSelector((state: RootState) => state.users)
  const questions = useSelector((state: RootState) => state.questions)

  if (!authedUser) return null

  const user = users[authedUser]
  const answeredQids = Object.keys(user.answers)
  const questionList = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
  const filteredQuestions = questionList.filter(q => showAnswered ? answeredQids.includes(q.id) : !answeredQids.includes(q.id))

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Employee Polls</h1>
        <p className="text-lg text-gray-600">Hello, {user.name}! Choose your questions below.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div className="tab-buttons">
          <button
            className={`tab-button ${!showAnswered ? 'active' : ''}`}
            onClick={() => setShowAnswered(false)}
          >
            Unanswered Questions
          </button>
          <button
            className={`tab-button ${showAnswered ? 'active' : ''}`}
            onClick={() => setShowAnswered(true)}
          >
            Answered Questions
          </button>
        </div>
      </div>

      <div className="question-list">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <h3>No questions found</h3>
            <p>{showAnswered ? 'You haven\'t answered any questions yet.' : 'All questions have been answered!'}</p>
          </div>
        ) : (
          filteredQuestions.map(q => (
            <li key={q.id} className="question-item">
              <Link to={`/questions/${q.id}`} className="question-link">
                <div className="question-text">
                  Would you rather {q.optionOne.text.toLowerCase()} or {q.optionTwo.text.toLowerCase()}?
                </div>
                <div className="question-meta">
                  Asked by {users[q.author].name} • {new Date(q.timestamp).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))
        )}
      </div>
    </div>
  )
}

export default Home