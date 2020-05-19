const express = require('express')
const userRouter = require('./users/user-router')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({testing: "SUCCESS!"})
})

server.use('/api/users', userRouter)

module.exports = server