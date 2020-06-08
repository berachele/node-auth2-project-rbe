const cors = require('cors')
const helmet = require('helmet')

const express = require('express')
const userRouter = require('./users/user-router')
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({testing: "SUCCESS!"})
})

server.use('/api/users', userRouter)

module.exports = server