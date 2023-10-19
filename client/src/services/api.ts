import { AUTH_STORAGE_KEY, type AuthState } from '@/redux/features/authReducer'

export function api<T> (url: URL | string, options: RequestInit = {}): Promise<T> {
  // Get Authorization Bearer from local storage.
  const authData = localStorage.getItem(AUTH_STORAGE_KEY) ?? 'null'
  const token = (JSON.parse(authData) as Omit<AuthState, 'isAuthenticated'>)?.token

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  return fetch(url, { ...options, headers })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json()
        throw res
      }
      return await (response.json() as Promise<T>)
    })
}

export function apiFiles<T> (url: URL | string, options: RequestInit = {}): Promise<T> {
  // Get Authorization Bearer from local storage.
  const authData = localStorage.getItem(AUTH_STORAGE_KEY) ?? 'null'
  const token = (JSON.parse(authData) as Omit<AuthState, 'isAuthenticated'>)?.token

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  return fetch(url, { ...options, headers })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json()
        throw res
      }
      return await (response.json() as Promise<T>)
    })
}
