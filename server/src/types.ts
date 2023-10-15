import { type Request } from 'express'
import { type User } from '@/models/User'

export interface AuthenticatedRequest extends Request {
  auth?: {
    user: User
  }
}
