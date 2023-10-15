import { Router } from 'express'

import { User } from '@/models/User'
import { validateBody } from '@/middlewares'
import { errorHandler } from '@/utils'
import { login, register } from '@/controllers/auth'

const LOGIN_ROUTE = '/login'
const REGISTER_ROUTE = '/register'

// routes
const router = Router()

router.post(
  LOGIN_ROUTE,
  validateBody(User.loginJsonSchema),
  errorHandler(login)
)

router.post(
  REGISTER_ROUTE,
  validateBody(User.registerJsonSchema),
  errorHandler(register)
)

export default router
