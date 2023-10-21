import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { type AuthState, loginSuccess, logoutAction, modifyUserAction } from '@/redux/features/authReducer'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { buildUrl } from '@/constants/env'
import { type UserInterface } from '@/types'

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

export interface MutationResponseType {
  message: string
  user: UserInterface
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
    return api<MutationResponseType>(buildUrl('/auth/register'), {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }, [])

  const modifyUserRequest = useCallback((userData: Partial<UserInterface>) => {
    setError(undefined)
    return api<MutationResponseType>(buildUrl(`/auth/user/${userData.id}`), {
      method: 'PUT',
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

  const { data: modifyUserResult, mutateAsync: modifyUser, isLoading: isLoadingModifyUser } = useMutation({
    mutationFn: modifyUserRequest,
    onSuccess: (data) => {
      dispatch(modifyUserAction(data.user))
    },
    onError: setError
  })

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [])

  useEffect(() => setError(undefined), [])

  return {
    data: registerResult ?? modifyUserResult,
    login,
    logout,
    register,
    modifyUser,
    isAuthenticated,
    isLoading: isLoadingLogin || isLoadingRegister || isLoadingModifyUser,
    error
  }
}

export default useAuthentication
