const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")
const pool = require("../db")

const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//register

router.post("/register", validInfo, async (request, response) => {
    try {

        // 1. desturcture the req.body
        
        const { name, email, password } = request.body

        // 2. check if user exist

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if (user.rows.length !== 0) {
            return response.status(401).send("User already exist")
        }

        // 3. Bcrypt the user password

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)

        // 4. enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        )

        // 5. generating jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)
        
        response.json({ token })
    } catch (err) {
        console.log(err.message)
        response.status(500).send("Server Error")
    }
})

// login route

router.post("/login", validInfo, async (request, response) => {
    try {
        // 1.destructure request.body

        const { email, password } = request.body

        // 2. check if user doesn't exist

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if (user.rows.length === 0) {
            return response.status(401).json("Password or Email is incorrect")
        }

        // 3. check if incoming password is the same as in the database

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return response.status(401).json("Password or Email is incorrect")
        }

        // 4. give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id)

        response.json({ token })

    } catch (error) {
        console.log(error.message)
        response.status(500).send("Server Error")
    }
})

router.get("/verify", authorization, async (request, response) => {
    try {
        response.json(true);
    } catch (error) {
        console.error(error)
        response.status(500).send("Server Error")
    }
})

module.exports = router;