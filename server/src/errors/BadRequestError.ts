import { ApiError } from './ApiError'

export default class BadRequestError extends ApiError {
  constructor (message: string = 'Bad Request') {
    super(400, message, 'BadRequest')
  }
}
