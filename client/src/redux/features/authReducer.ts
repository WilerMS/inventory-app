import { type UserInterface } from '@/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  user?: UserInterface
  token?: string
  isAuthenticated: boolean
}

export const AUTH_STORAGE_KEY = 'auth_data'

const initialState: AuthState = (() => {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY) ?? 'null'
  const auth = JSON.parse(authData) as Omit<AuthState, 'isAuthenticated'>

  return auth
    ? { ...auth, isAuthenticated: true }
    : { isAuthenticated: false }
})()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Omit<AuthState, 'isAuthenticated'>>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logoutAction: (state) => {
      state.isAuthenticated = false
      state.user = undefined
      state.token = undefined
    }
  }
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutAction } = authSlice.actions

export default authSlice.reducer
