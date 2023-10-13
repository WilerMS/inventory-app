import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

import { ApiError } from '@/errors'

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res
      .status(err.status)
      .json({
        error: err.name,
        message: err.message
      })
  } else {
    res
      .status(500)
      .json({
        error: 'InternalServerError',
        message: 'Something went wrong!'
      })
  }
}
