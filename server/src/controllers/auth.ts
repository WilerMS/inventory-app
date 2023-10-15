import { type RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@/models/User'
import { ConflictError, UnauthorizedError } from '@/errors'
import { JWT_SECRET } from '@/constants/env'

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

  return res.json({ message: 'Login success', token })
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
