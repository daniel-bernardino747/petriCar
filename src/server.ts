import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import routes from './infra/routes/index'
import 'express-async-errors'

dotenv.config()

const app = express()
app.use(cors()).use(express.json()).use(routes)

const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`)
})
