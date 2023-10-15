export function api<T> (url: URL | string, options: RequestInit = {}): Promise<T> {
  // Get Authorization Bearer from local storage.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ3aWxlciIsImlhdCI6MTY5NzQwNDc2NSwiZXhwIjoxNjk3NDExOTY1fQ.W4pzMw1PNqgiLUzeOWMZxbzBVqhVya0YJCgN0PvV7rA'
  const headers = token
    ? { ...options.headers, Authorization: `Bearer ${token}` }
    : options.headers

  return fetch(url, { ...options, headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}
