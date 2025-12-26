import { useParams, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveQuestionAnswer } from '../features/questionsSlice'
import { useAppDispatch } from '../store'
import type { RootState } from '../store'

const QuestionDetails = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const authedUser = useSelector((state: RootState) => state.authedUser)
  const users = useSelector((state: RootState) => state.users)
  const questions = useSelector((state: RootState) => state.questions.questions)
  const questionsLoading = useSelector((state: RootState) => state.questions.loading)

  if (questionsLoading) {
    return <div className="page-container"><div className="text-center">Loading...</div></div>
  }

  if (!id || !questions[id]) {
    return <Navigate to="/404" />
  }

  const question = questions[id]

  // Ensure user data is loaded
  if (!users[question.author] || (authedUser && !users[authedUser])) {
    return <div className="page-container"><div className="text-center">Loading...</div></div>
  }
  const author = users[question.author]
  const answered = authedUser && users[authedUser] && users[authedUser].answers[id]
  const userAnswer = answered ? users[authedUser].answers[id] : null

  const handleVote = (answer: 'optionOne' | 'optionTwo') => {
    if (authedUser) {
      dispatch(saveQuestionAnswer({ authedUser, qid: id, answer }))
    }
  }

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  const optionOnePercent = totalVotes > 0 ? (question.optionOne.votes.length / totalVotes * 100).toFixed(1) : 0
  const optionTwoPercent = totalVotes > 0 ? (question.optionTwo.votes.length / totalVotes * 100).toFixed(1) : 0

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Poll Details</h1>
        <p className="text-lg text-gray-600">Would you rather...</p>
      </div>

      <div className="poll-container">
        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={author.avatarURL}
              alt={author.name}
              className="w-12 h-12 rounded-full border-2 border-primary-color"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{author.name}</h3>
              <p className="text-sm text-gray-500">
                Asked on {new Date(question.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {answered ? (
          <div className="card">
            <h3 className="text-xl font-semibold text-center mb-6">Results</h3>
            <div className="poll-options">
              <div className={`poll-option ${userAnswer === 'optionOne' ? 'selected' : ''}`}>
                <div className="poll-text">{question.optionOne.text}</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${optionOnePercent}%` }}
                  ></div>
                </div>
                <div className="poll-stats">
                  {question.optionOne.votes.length} votes ({optionOnePercent}%)
                  {userAnswer === 'optionOne' && (
                    <span className="ml-2 text-primary-color font-semibold">✓ Your choice</span>
                  )}
                </div>
              </div>

              <div className={`poll-option ${userAnswer === 'optionTwo' ? 'selected' : ''}`}>
                <div className="poll-text">{question.optionTwo.text}</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${optionTwoPercent}%` }}
                  ></div>
                </div>
                <div className="poll-stats">
                  {question.optionTwo.votes.length} votes ({optionTwoPercent}%)
                  {userAnswer === 'optionTwo' && (
                    <span className="ml-2 text-primary-color font-semibold">✓ Your choice</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              Total votes: {totalVotes}
            </div>
          </div>
        ) : (
          <div className="card">
            <h3 className="text-xl font-semibold text-center mb-6">Cast Your Vote</h3>
            <div className="poll-options">
              <button
                className="poll-option w-full text-left"
                onClick={() => handleVote('optionOne')}
              >
                <div className="poll-text">{question.optionOne.text}</div>
              </button>

              <div className="text-center text-gray-500 font-medium py-2">OR</div>

              <button
                className="poll-option w-full text-left"
                onClick={() => handleVote('optionTwo')}
              >
                <div className="poll-text">{question.optionTwo.text}</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDetails