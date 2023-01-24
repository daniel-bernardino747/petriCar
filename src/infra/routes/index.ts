import { TestQualityController } from '@/src/app/controllers/testQualityController'
import express from 'express'

const routes = express.Router()

const testQualityController = new TestQualityController()

routes.get('/start', testQualityController.checkProductQuality)

export default routes
