const jwt = require('jsonwebtoken')
const configVars = require('../config/vars')

module.exports = async function restricted(req, res, next) {
    const token = req.headers.authorization

    if(token){
        const secret = configVars.jwtSecret

        jwt.verify(token, secret, (err, decodedPayload) => {
            if(err){
                //token is invalid
                res.status(401).json({
                    message: "Invalid credentials"
                })
            }else {
                //token is good
                req.jwt = decodedPayload //any other middleware that comes after sucessful login/middleware can read the token

                next()
            }
        })
    }else{
        res.status(400).json({
            message: "Please provide the authentication information"
        })
    }
}