import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../store'

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const authedUser = useSelector((state: RootState) => state.authedUser)
  const location = useLocation()

  if (!authedUser) {
    // Store the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute