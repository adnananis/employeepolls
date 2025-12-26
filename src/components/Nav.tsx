import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAuthedUser } from '../features/authedUserSlice'
import type { RootState } from '../store'

const Nav = () => {
  const authedUser = useSelector((state: RootState) => state.authedUser)
  const users = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setAuthedUser(null))
  }

  if (!authedUser || !users[authedUser]) return null

  const user = users[authedUser]

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-semibold text-primary-color hover:text-primary-hover">
          Employee Polls
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-primary-color transition-colors">
            Home
          </Link>
          <Link to="/add" className="text-gray-600 hover:text-primary-color transition-colors">
            New Question
          </Link>
          <Link to="/leaderboard" className="text-gray-600 hover:text-primary-color transition-colors">
            Leaderboard
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={user.avatarURL}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-primary-color"
        />
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
        <button
          onClick={handleLogout}
          className="btn-secondary text-sm px-3 py-1"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Nav