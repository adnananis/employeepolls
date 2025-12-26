import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { setAuthedUser } from '../features/authedUserSlice'
import type { RootState } from '../store'

const Login = () => {
  const users = useSelector((state: RootState) => state.users)
  const authedUser = useSelector((state: RootState) => state.authedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedUser, setSelectedUser] = useState('')

  useEffect(() => {
    if (authedUser) {
      // Redirect to the intended page or home if no intended page
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [authedUser, navigate, location])

  const handleLogin = () => {
    if (selectedUser) {
      dispatch(setAuthedUser(selectedUser))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="card max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Polls</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <div className="form-group">
            <label htmlFor="user-select" className="form-label">
              Select User
            </label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full"
              required
            >
              <option value="">Choose a user...</option>
              {Object.values(users).map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedUser}
            className="w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login