const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json([{'id': 6, 'name': 'Paul'}, {'id': 7, 'name': 'Julia'}])
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})