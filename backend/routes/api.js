const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

// List all users that take part in match
router.get("/matches/:id/users", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query("SELECT user_id FROM users_in_matches WHERE match_id = $1", [match_id], (error, results) => {
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
        if (error) {
          throw error
        }
        response.status(200).json(results.rows[0])
    })
})

// Returns all matches from database
router.get("/matches", (request, response) => {

    pool.query('SELECT * FROM matches', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
})

router.get("/matches/:id", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query('SELECT * FROM matches WHERE match_id = $1', [match_id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows[0])
    })
})

module.exports = router;