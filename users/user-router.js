const bcrypt = require('bcryptjs')

const express = require('express')

const router = express.Router()

const Users = require('./user-model')

const {isValid} = require('../middleware/user-mw')
const restricted = require('../middleware/restricted-mw')

router.post('/register', (req, res) => {
    const creds = req.body

    if(isValid(creds)){
        
    }else{
        res.status(400).json({
            message: "Please provide username, password, and department. Password must be alphanumeric."
        })
    }
})

router.post('/regloginister', (req, res) => {

})

router.get('/users', (req, res) => {

})


module.exports = router