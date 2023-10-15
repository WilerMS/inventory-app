import { type Request } from 'express'
import { type User } from '@/models/User'

declare interface AuthenticatedRequest extends Request {
  auth: {
    user: User
  }
}
