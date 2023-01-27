import httpStatus from 'http-status'
import { AppError, AppErrorArgs } from './AppError'

export class NotEnableError extends AppError {
  constructor(
    args: AppErrorArgs = {
      httpCode: +httpStatus.BAD_REQUEST,
      description: 'This action is not enabled.',
      name: 'NotEnableError',
    },
  ) {
    super(args)
  }
}
