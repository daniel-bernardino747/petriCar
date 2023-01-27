import express from 'express'
import { TestQualityController } from '@/controllers'
import { health } from './health.routes'

const routes = express.Router()

const testQualityController = new TestQualityController()

routes
  .get('/health', health)
  .get('/start', testQualityController.checkProductQuality)

export default routes
