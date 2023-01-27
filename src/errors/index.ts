export * from './notEnableError'

export class ClientError extends Error {
  constructor(message = 'An unexpected error occurred') {
    super(...message)
    this.message = message
  }
}
