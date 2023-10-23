import { type RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@/models/User'
import { ConflictError, UnauthorizedError } from '@/errors'
import { JWT_SECRET } from '@/constants/env'
import { type AuthenticatedRequest } from '@/types'

// typing req.body
type LoginBodyType = Pick<User, 'username' | 'password'>
type RegisterBodyType = Pick<User, 'name' | 'username' | 'password'>

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body as LoginBodyType

  const user = await User.query().findOne({ username })
  if (!user) {
    throw new UnauthorizedError('Username or password are incorrect')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Username or password are incorrect')
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  )

  return res.json({ message: 'Login success', token, user: user.toResponse() })
}

export const register: RequestHandler = async (req, res) => {
  const { name, username, password } = req.body as RegisterBodyType

  const existingUser = await User.query().findOne({ username })
  if (existingUser) {
    throw new ConflictError('User already exist, try wih another username')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User
    .query()
    .insert({ name, username, password: hashedPassword })

  return res.json({
    message: 'User successfully created',
    user: newUser.toResponse()
  })
}

export const updateUser: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const { name, username, password, birth_date, gender, image } = req.body
  const { id } = req.params

  if (req.auth?.user.id !== Number(id)) {
    throw new UnauthorizedError("You don't have access to this resources")
  }

  const existingUser = await User.query().findById(id)
  if (!existingUser) {
    throw new ConflictError('User not found')
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : undefined

  await User
    .query()
    .findById(id)
    .patch({ name, username, password: hashedPassword, birth_date, gender, image })

  const updatedUser = await User.query().findById(id) as User

  return res.json({
    message: 'User successfully updated',
    user: updatedUser.toResponse()
  })
}

export const getUser: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const { id } = req.params

  if (req.auth?.user.id !== Number(id)) {
    throw new UnauthorizedError("You don't have access to this resources")
  }

  const existingUser = await User.query().findById(id)
  if (!existingUser) {
    throw new ConflictError('User not found')
  }

  return res.json({
    user: existingUser.toResponse()
  })
}
