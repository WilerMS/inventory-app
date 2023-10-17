import { type PayloadAction, type Middleware } from '@reduxjs/toolkit'
import { type AuthState, loginSuccess, logoutAction, AUTH_STORAGE_KEY } from '../features/authReducer'

export const authMiddleware: Middleware = ({ dispatch }) => (next) => (action: PayloadAction<Omit<AuthState, 'isAuthenticated'>>) => {
  if (action.type === loginSuccess.type) {
    const { user, token } = action.payload
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }))
  } else if (action.type === logoutAction.type) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return next(action)
}
