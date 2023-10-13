import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { PORT } from './constants/env'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())

// routes

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
