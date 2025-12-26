import { useEffect } from 'react'
import { useAppDispatch } from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchUsers } from './features/usersSlice'
import { fetchQuestions } from './features/questionsSlice'
import Login from './components/Login'
import Home from './components/Home'
import QuestionDetails from './components/QuestionDetails'
import NewQuestion from './components/NewQuestion'
import Leaderboard from './components/Leaderboard'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchQuestions())
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        <Nav />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/questions/:id" element={<ProtectedRoute><QuestionDetails /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><NewQuestion /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
