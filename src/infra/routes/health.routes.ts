import { Request, Response } from 'express'
import httpStatus from 'http-status'

export async function health(_req: Request, res: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  try {
    res.send(healthcheck)
  } catch (error) {
    healthcheck.message = error as string
    res.status(httpStatus.SERVICE_UNAVAILABLE).send(healthcheck)
  }
}
