import 'express-async-errors'
import './process'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './infra/routes/index'
import { errorHandlerMiddleware } from './middlewares/errors-handler.middlewares'

dotenv.config()

const app = express()
app.use(cors()).use(express.json()).use(routes).use(errorHandlerMiddleware)

const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`)
})
