import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { type AuthState, loginSuccess, logoutAction } from '@/redux/features/authReducer'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { buildUrl } from '@/constants/env'

interface RegisterRequestBodyType {
  username: string
  name: string
  password: string
}

type LoginRequestBodyType = Pick<RegisterRequestBodyType, 'username' | 'password'>

interface MutationErrorType {
  error: string
  message: string
}

const useAuthentication = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<MutationErrorType>()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  const loginRequest = useCallback((userData: LoginRequestBodyType) => {
    setError(undefined)
    return api<Omit<AuthState, 'isAuthenticated'>>(buildUrl('/auth/login'), {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }, [])

  const registerRequest = useCallback((userData: RegisterRequestBodyType) => {
    setError(undefined)
    return api<{ message: string }>(buildUrl('/auth/register'), {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }, [])

  const { mutateAsync: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(loginSuccess(data))
    },
    onError: setError
  })

  const { data: registerResult, mutateAsync: register, isLoading: isLoadingRegister } = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => { },
    onError: setError
  })

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [])

  useEffect(() => setError(undefined), [])

  return {
    data: registerResult,
    login,
    logout,
    register,
    isAuthenticated,
    isLoading: isLoadingLogin || isLoadingRegister,
    error
  }
}

export default useAuthentication
