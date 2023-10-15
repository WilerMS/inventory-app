import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import zonesRouter from '@/routes/zones'
import authRouter from '@/routes/auth'
import productsRouter from '@/routes/products'
import filesRouter from '@/routes/files'
import { PORT } from '@/constants/env'
import { errorMiddleware, authenticateToken } from '@/middlewares'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/images', express.static('public/images'))

// Auth route, without protection
app.use('/auth', authRouter)

// auth middleware
app.use(authenticateToken)

// protected routes
app.use('/zones', zonesRouter)
app.use('/files', filesRouter)
app.use('/products', productsRouter)

// Error handling
app.use(errorMiddleware)

// running app
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
