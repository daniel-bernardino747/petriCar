import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../errors/errorHandler'

function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  errorHandler.handleError(err, res)
  next()
}

export { errorHandlerMiddleware }
