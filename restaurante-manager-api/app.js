import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './src/Config/database.js'
import { configDotenv } from 'dotenv'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import authRoutes from './src/Routes/auth.routes.js'
import profileRoutes from './src/Routes/profile.routes.js'
import productsRoutes from './src/Routes/product.routes.js'
import ordersRoutes from './src/Routes/order.routes.js'
import tablesRoutes from './src/Routes/table.routes.js'
import usersRoutes from './src/Routes/user.routes.js'
import jwt from 'jsonwebtoken'
import { UserRepository } from './src/Repository/user.repository.js'
import { setSocketInstance } from './src/Sockets/socket.js'
import { OrderService } from './src/Service/order.service.js'
import { ORDER_EVENTS } from './src/utils/order.events.js'
configDotenv()

const PORT = process.env.PORT ?? 3000
const app = express()
await connectDb()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: true,
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
})
setSocketInstance(io)

//  middleware de identificación para Socket.IO

io.use(async (socket, next) => {
  if (process.env.NODE_ENV !== 'production') {
    socket.user = {
      id: 'test',
      role: socket.handshake.auth.token,
      nombre: 'TestUser'
    }
    return next()
  }
  const token = socket.handshake.auth.token || socket.handshake.query.token
  if (!token) {
    return next(new Error('Access denied: Token not validate or not exsist'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    const user = await UserRepository.getUserById(decoded.id)
    if (!user) {
      return next(new Error('User not Found'))
    }

    socket.user = { id: user._id, role: user.role, nombre: user.nombre }
    next()
  } catch (error) {
    next(new Error('Invalid or expired Token'))
  }
})

io.on('connection', async (socket) => {
  const { nombre, role } = socket.user
  console.log(`User connected: ${nombre} with role: ${role}`)

  console.log('socket rooms', socket.rooms)

  socket.join(role)
  console.log(`Socket ${socket.id} united to room ${role}`)

  socket.on('order:changeStatus', async (updateOrder) => {
    if (!updateOrder) return

    const { orderId, status } = updateOrder

    const result = await OrderService.updateStatus(orderId, status, 'kitchen')

    const { order, newStatus } = result

    const config = ORDER_EVENTS[newStatus]

    if (config) {
      const { event, rooms } = config

      if (rooms.includes('all')) {
        io.emit(event, order)
      } else {
        console.log('EMITIENDO EVENTO')
        console.log('DATA:', status)
        console.log('emitiendo a rooms:', rooms)
        rooms.forEach(room => {
          io.to(room).emit(event, order)
        })
      }
    }
  })

  socket.on('disconnect', () => {
    console.log(`User: ${nombre} is disconnect or logout`)
  })
})

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.use('/tables', tablesRoutes)
app.use('/users', usersRoutes)

server.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
