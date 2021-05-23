const jwt = require('jsonwebtoken');
const config = require('../config.js');


exports.auth = (req, res, next) => {
    const  token = req.header("auth-token")
    if(!token) res.status(401).send("access restricted");
    try {
        const verified = jwt.verify(token, config.secert)
        req.user = verified
        next()
    } catch (error) {
        // res.status(400).send(error.message)
        console.log(error)
    }
}