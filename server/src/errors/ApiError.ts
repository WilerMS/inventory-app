export abstract class ApiError extends Error {
  status: number

  constructor (status: number, message: string, name: string) {
    super(message)
    this.name = name
    this.status = status
  }
}
