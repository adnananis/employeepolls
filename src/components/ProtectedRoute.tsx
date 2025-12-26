import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../store'

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const authedUser = useSelector((state: RootState) => state.authedUser)
  return authedUser ? children : <Navigate to="/login" />
}

export default ProtectedRoute