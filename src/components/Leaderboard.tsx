import { useSelector } from 'react-redux'
import type { RootState } from '../store'

const Leaderboard = () => {
  const users = useSelector((state: RootState) => state.users)

  const userList = Object.values(users).map(user => ({
    ...user,
    asked: user.questions.length,
    answered: Object.keys(user.answers).length,
    score: user.questions.length + Object.keys(user.answers).length
  })).sort((a, b) => b.score - a.score)

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-lg text-gray-600">Top performers in Employee Polls</p>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="rank-column">
                <span className="header-icon">🏅</span>
                <span>Rank</span>
              </th>
              <th className="avatar-column">
                <span className="header-icon">📸</span>
                <span>Avatar</span>
              </th>
              <th className="name-column">
                <span className="header-icon">👤</span>
                <span>Name</span>
              </th>
              <th className="stats-column">
                <span className="header-icon">❓</span>
                <span>Questions Asked</span>
              </th>
              <th className="stats-column">
                <span className="header-icon">✅</span>
                <span>Questions Answered</span>
              </th>
              <th className="score-column">
                <span className="header-icon">⭐</span>
                <span>Total Score</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id} className={`leaderboard-row ${index < 3 ? `top-${index + 1}` : ''}`}>
                <td className="rank-cell">
                  <div className={`rank-number ${index < 3 ? `rank-${index + 1}` : ''}`}>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </div>
                </td>
                <td className="avatar-cell">
                  <div className="avatar-container">
                    <img
                      src={user.avatarURL}
                      alt={user.name}
                      className="user-avatar-table"
                    />
                  </div>
                </td>
                <td className="name-cell">
                  <span className="user-name-table">{user.name}</span>
                </td>
                <td className="stats-cell">
                  <div className="stat-value">{user.asked}</div>
                </td>
                <td className="stats-cell">
                  <div className="stat-value">{user.answered}</div>
                </td>
                <td className="score-cell">
                  <div className={`score-badge ${index < 3 ? `score-${index + 1}` : ''}`}>
                    {user.score}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard