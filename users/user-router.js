const bcrypt = require('bcryptjs')

const express = require('express')

const router = express.Router()

const Users = require('./user-model')

const {isValidSignup, isValidLogin} = require('../middleware/user-mw')
const restricted = require('../middleware/restricted-mw')
const generateToken = require('./generateToken')

//bringing in /api/users
router.post('/register', (req, res) => {
    const creds = req.body

    if(isValidSignup(creds)){
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

    if(isValidLogin(req.body)) {
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

router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({users, jwt: req.jwt}) //where we can list jwt if logged in
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: "There was an error getting users information"
        })
    })
})


module.exports = router