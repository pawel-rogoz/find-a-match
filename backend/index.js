const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.use("/auth", require("./routes/jwtAuth"))

app.use("/dashboard", require("./routes/dashboard"))

app.use("/api", require("./routes/api"))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})