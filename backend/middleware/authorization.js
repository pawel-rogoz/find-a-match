const jwt = require("jsonwebtoken")

require("dotenv").config()

module.exports = async (request, response, next) => {
    try {
        
        const jwtToken = request.header("token")

        if (!jwtToken) {
            return response.status(403).json("Not Authorize")
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        request.user = payload.user
        next()

    } catch (error) {
        console.error(error.message)
        return response.status(403).json("Not authorize")
    }
}