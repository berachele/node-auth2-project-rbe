const bcrypt = require('bcryptjs')

const express = require('express')

const router = express.Router()

const Users = require('./user-model')

const {isValid} = require('../middleware/user-mw')
const restricted = require('../middleware/restricted-mw')
const generateToken = require('./generateToken')

router.post('/register', (req, res) => {
    const creds = req.body

    if(isValid(creds)){
        const ROUNDS = process.env.BCRYPT_ROUNDS || 8
        const hash = bcrypt.hashSync(creds.password, ROUNDS)

        creds.password = hash

        Users.add(creds)
        .then(user => {
            res.status(201).json({
                data: user
            })
        })
        .catch(err => {
            console.log({err})
            res.status(500).json({
                message: err.message
            })
        })
    }else{
        res.status(400).json({
            message: "Please provide username, password, and department. Password must be alphanumeric."
        })
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    if(isValid(req.body)) {
        Users.findBy({username: username})
        .then(([user]) => {
            //compare hash
            if(user && bcrypt.compareSync(password, user.password)){
                //produce and send token
                const token = generateToken(user)
                
                res.status(200).json({
                    message: `Welcome, ${user.username}`,
                    token: token
                })
            }else{
                res.status(401).json({
                    message: "Invalid credentials"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
    }else{
        res.status(400).json({
            message: "Please provide username, password, and department. Password must be alphanumeric."
        })
    }
})

router.get('/users', (req, res) => {

})

module.exports = router