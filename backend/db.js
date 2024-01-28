const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    user: "postgres",
    password: process.env.databaseSecret,
    host: "localhost",
    port: 5432,
    database: "find_a_match"
});

module.exports = pool;
