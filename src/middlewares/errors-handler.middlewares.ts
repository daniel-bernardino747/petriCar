import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../errors/errorHandler'

function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  errorHandler.handleError(err, res)
}

export { errorHandlerMiddleware }
