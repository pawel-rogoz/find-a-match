const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.post("/", authorization, async (request, response) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
            request.user.id
        ])

        response.json(user.rows[0])
    } catch (error) {
        console.error(error)
        response.status(500).json("Server Error")
    }
})

module.exports = router;