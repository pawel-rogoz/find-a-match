const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

// List all users that take part in match
router.get("/matches/:id/users", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query("SELECT users.user_id, users.user_name FROM users_in_matches INNER JOIN users ON users_in_matches.user_id = users.user_id WHERE users_in_matches.match_id = $1", [match_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

// List all matches that given user takes part in
router.get("/users/:id/matches", (request, response) => {
    const user_id = Number(request.params.id)

    pool.query("SELECT match_id FROM users_in_matches WHERE user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

// Returns all objects from database
router.get("/objects", (request, response) => {
    pool.query('SELECT * FROM objects', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
})

// Returns a object with given id
router.get("/objects/:id", (request, response) => {
    const object_id = Number(request.params.id)

    pool.query('SELECT * FROM objects WHERE object_id = $1', [object_id], (error, results) => {
        if ((error) || (results.rows.length === 0)) {
            response.status(400).send('ERROR: There was an error trying to get data')
        }
        response.status(200).json(results.rows[0])
    })
})

// Returns all matches from database
router.get("/matches", (request, response) => {

    pool.query('SELECT * FROM matches', (error, results) => {
        if (error) {
            response.status(400).send('ERROR: There was an error trying to get data')
        }
        response.status(200).json(results.rows)
    })
})

// Returns a match with given id
router.get("/matches/:id", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query('SELECT * FROM matches WHERE match_id = $1', [match_id], (error, results) => {
        if ((error) || (results.rows.length === 0)) {
            response.status(400).send('ERROR: There was an error trying to get data')
        }
        response.status(200).json(results.rows[0])
    })
})

// Add match to database, user_id is taken from user token
router.post("/matches", authorization, (request, response) => {
    const { object_id, match_date } = request.body
    const host_id = request.user.id

    pool.query('INSERT INTO matches (object_id, host_id, match_date) VALUES ($1, $2, $3) RETURNING *', [object_id, host_id, match_date], (error, results) => {
        if (error) {
          response.status(400).send('ERROR: There was an error adding this match to database')
        }
        response.status(200).json(results.rows[0])
    })
})

// Add user to a match using POST method but it has no data to send except for id 'hidden' in token
// WARNING - server crashes if user is already taking part in match - TO DO
router.post("/matches/:id/users", authorization, (request, response) => {
    const match_id = Number(request.params.id)
    const user_id = request.user.id

    pool.query('INSERT INTO users_in_matches (match_id, user_id) VALUES ($1, $2) RETURNING *', [match_id, user_id], (error, results) => {
        if (error) {
          response.status(400).send('ERROR: Perhaps user is already taking part in this match')
        }
        response.status(200).json(results.rows[0])
    })
})

module.exports = router;