const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", require("./routes/jwtAuth"))

app.use("/dashboard", require("./routes/dashboard"))

app.post("/api/users", (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name], (error, results) => {
    if (error) {
      throw error
    }
    console.log
    response.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
  })
})

app.get("/api/users", (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})