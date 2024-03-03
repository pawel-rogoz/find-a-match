const jwt = require("jsonwebtoken")
require('dotenv').config()

function jwtGenerator(user_id, user_name) {
    const payload = {
        user: {
            id: user_id,
            name: user_name
        }
    }
    
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" })
}

module.exports = jwtGenerator