export const API_HOST = 'http://192.168.1.160:3000'

type QueryType = Record<string, string>

export const buildUrl = (path: `/${string}`, query: QueryType = {}) => {
  const queryString = new URLSearchParams(query).toString()
  const queryStringPath = queryString ? `?${queryString}` : ''

  return `${API_HOST}${path}${queryStringPath}`
}
