import { type Request, type Response, type NextFunction } from 'express'

import { ApiError } from '@/errors'
import { ValidationError } from 'objection'

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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

  res
    .status(500)
    .json({
      error: 'InternalServerError',
      message: 'Something went wrong!'
    })
}
