export interface ZoneInterface {
  id: number
  name: string
  image?: string
  user_id: number
  notes?: string
  color?: `#${string}`
}

export interface UserInterface {
  id: number
  name: string
  username: string
  image?: string
  gender?: 'male' | 'female'
  birth_date?: string
  color?: `#${string}`
}

export type Children = JSX.Element | JSX.Element[] | string | string[]
