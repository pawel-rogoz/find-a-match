const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.get("/users/:user_id/matches/:match_id", (request, response) => {
    const user_id = Number(request.params.user_id)
    const match_id = Number(request.params.match_id)

    pool.query("SELECT user_id, match_id, completed FROM users_in_matches WHERE user_id = $1 AND match_id = $2", [user_id, match_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows[0])
    })
})

router.put("/users/:user_id/matches/:match_id", authorization, (request, response) => {
    const user_id = Number(request.params.user_id)
    const match_id = Number(request.params.match_id)

    const { completed } = request.body

    pool.query("UPDATE users_in_matches SET completed = $1 WHERE user_id = $2 AND match_id = $3 RETURNING *", [completed, user_id, match_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows[0])
    })
})

// List all users that take part in match
router.get("/matches/:id/users", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query("SELECT users.* FROM users_in_matches INNER JOIN users ON users_in_matches.user_id = users.user_id WHERE users_in_matches.match_id = $1", [match_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows)
    })
})

// List all matches that given user takes part in
router.get("/users/:id/matches", (request, response) => {
    const user_id = Number(request.params.id)

    pool.query("SELECT matches.* FROM users_in_matches INNER JOIN matches ON users_in_matches.match_id = matches.match_id WHERE user_id = $1", [user_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows)
    })
})

// Returns all objects from database
router.get("/objects", (request, response) => {
    pool.query('SELECT * FROM objects', (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
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

    pool.query('SELECT matches.*, COUNT(users_in_matches.user_id) AS curr_num_players FROM matches INNER JOIN users_in_matches ON matches.match_id = users_in_matches.match_id GROUP BY matches.match_id', (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        results.rows.forEach(row => row.curr_num_players = parseInt(row.curr_num_players))
        response.status(200).json(results.rows)
    })
})

// Returns a match with given id, also object name and URL, and host name (using INNER JOIN)
router.get("/matches/:id", (request, response) => {
    const match_id = Number(request.params.id)

    pool.query('SELECT matches.*, COUNT(users_in_matches.user_id) AS curr_num_players, users.user_name, objects.object_name, objects.object_url FROM matches INNER JOIN objects ON objects.object_id = matches.object_id INNER JOIN users ON users.user_id = matches.host_id INNER JOIN users_in_matches ON users_in_matches.match_id = matches.match_id WHERE matches.match_id = $1 GROUP BY matches.match_id, users.user_id, objects.object_id', [match_id], (error, results) => {
        if ((error) || (results.rows.length === 0)) {
            response.status(400).send('ERROR: There was an error trying to get data')
        }
        results.rows[0].curr_num_players = parseInt(results.rows[0].curr_num_players)
        response.status(200).json(results.rows[0])
    })
})

router.put("/matches/:id", authorization, (request, response) => {
    const match_id = Number(request.params.id)

    const { match_code } = request.body
    
    pool.query('UPDATE matches SET match_code = $1 WHERE match_id = $2 RETURNING *', [match_code, match_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results)
    })
})

router.get("/matchesBetweenDates", (request, response) => {
    const min_date = request.query.min_date
    const max_date = request.query.max_date

    pool.query('SELECT matches.*, COUNT(users_in_matches.user_id) AS curr_num_players FROM matches INNER JOIN users_in_matches ON matches.match_id = users_in_matches.match_id WHERE match_date BETWEEN $1 AND $2 GROUP BY matches.match_id', [min_date, max_date], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows)
    })
})

// Add match to database, user_id is taken from user token
router.post("/matches", authorization, (request, response) => {
    const { object_id, match_date, match_name, num_players } = request.body
    const host_id = request.user.id

    pool.query('INSERT INTO matches (object_id, host_id, match_date, match_name, num_players) VALUES ($1, $2, $3, $4, $5) RETURNING *', [object_id, host_id, match_date, match_name, num_players], (error, results) => {
        if (error) {
          response.status(400).send(`ERROR: ${error}`)
        } else {
            pool.query('INSERT INTO users_in_matches (user_id, match_id) VALUES ($1, $2)', [host_id, results.rows[0].match_id], (error, results) => {
                if (error) {
                    response.status(400).send(`ERROR: ${error}`)
                }
            }) 
            response.status(200).json(results.rows[0])
        }
    })
})

// Add user to a match using POST method but it has no data to send except for id 'hidden' in token
// WARNING - server crashes if user is already taking part in match - TO DO
router.post("/matches/:id/users", authorization, (request, response) => {
    const match_id = Number(request.params.id)
    const user_id = request.user.id

    pool.query('INSERT INTO users_in_matches (match_id, user_id) VALUES ($1, $2) RETURNING *', [match_id, user_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows[0])
    })
})

router.delete("/matches/:id/users", authorization, (request, response) => {
    const match_id = Number(request.params.id)
    const user_id = request.user.id

    pool.query('DELETE FROM users_in_matches WHERE user_id = $1 AND match_id = $2 RETURNING *', [user_id, match_id], (error, results) => {
        if (error) {
            response.status(400).send(`ERROR: ${error}`)
        }
        response.status(200).json(results.rows[0])
    })
})

module.exports = router;