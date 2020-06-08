const configVars = require('../config/vars')
const jwt = require('jsonwebtoken')

module.exports = function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const options = {
        expiresIn: '1h'
    } 

    return jwt.sign(payload, configVars.jwtSecret, options)
}