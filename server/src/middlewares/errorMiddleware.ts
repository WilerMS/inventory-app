import { type Request, type Response, type NextFunction } from 'express'

import { ApiError, ConflictError } from '@/errors'
import { NotNullViolationError, UniqueViolationError, ValidationError } from 'objection'

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ err })
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({
        error: err.name,
        message: err.message,
        details: err.details
      })
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: ValidationError.name,
      message: err.message,
      details: err.data
    })
  }

  if (err instanceof UniqueViolationError) {
    return res.status(409).json({
      error: ConflictError.name,
      message: 'A record with the same value already exists.',
      details: err.columns
    })
  }

  if (err instanceof NotNullViolationError) {
    return res.status(400).json({
      error: NotNullViolationError.name,
      message: err.message,
      details: err.column
    })
  }

  res
    .status(500)
    .json({
      error: 'InternalServerError',
      message: 'Something went wrong!'
    })
}
