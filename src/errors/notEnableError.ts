import { ClientError } from '.'

export class NotEnableError extends ClientError {
  constructor(message = 'This action is not enabled') {
    super(...message)
    this.message = message
  }
}
