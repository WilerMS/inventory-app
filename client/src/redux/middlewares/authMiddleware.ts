import { type PayloadAction, type Middleware } from '@reduxjs/toolkit'
import { type AuthState, loginSuccess, logoutAction, AUTH_STORAGE_KEY, modifyUserAction } from '../features/authReducer'

export const authMiddleware: Middleware = ({ dispatch: _ }) => (next) => (action: PayloadAction<Omit<AuthState, 'isAuthenticated'>>) => {
  if (action.type === loginSuccess.type) {
    const { user, token } = action.payload
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }))
  } else if (action.type === logoutAction.type) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } else if (action.type === modifyUserAction.type) {
    const user = action.payload

    const storage = localStorage.getItem(AUTH_STORAGE_KEY)
    // @ts-expect-error
    const token = JSON.parse(storage).token as string

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }))
  }

  return next(action)
}
