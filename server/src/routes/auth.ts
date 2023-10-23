import { Router } from 'express'

import { User } from '@/models/User'
import { authenticateToken, validateBody } from '@/middlewares'
import { errorHandler } from '@/utils'
import { getUser, login, register, updateUser } from '@/controllers/auth'

const LOGIN_ROUTE = '/login'
const REGISTER_ROUTE = '/register'
const AUTH_USER_ID = '/user/:id(\\d+)'

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

router.put(
  AUTH_USER_ID,
  authenticateToken,
  validateBody(User.jsonSchema),
  errorHandler(updateUser)
)

router.get(
  AUTH_USER_ID,
  authenticateToken,
  errorHandler(getUser)
)

export default router
