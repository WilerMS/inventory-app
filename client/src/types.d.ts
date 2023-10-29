export interface ProductInterface {
  id: number
  name: string
  image?: string
  color?: `#${string}`
  amount: number
  user_id: number
  zone_id: number | undefined
  expiration_date?: string
  price?: number
  notes?: string
  zone?: ZoneInterface
}

export interface ZoneInterface {
  id: number
  name: string
  image?: string
  user_id: number
  notes?: string
  color?: `#${string}`
  products?: ProductInterface[]
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
