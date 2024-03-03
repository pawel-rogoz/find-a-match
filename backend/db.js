const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_SECRET,
    host: process.env.DATABASE_HOST,
    port: 5432,
    database: process.env.DATABASE_NAME
});

console.log('HOST', process.env.DATABASE_HOST)
console.log('USER', process.env.DATABASE_USER)
console.log('SECRET', process.env.DATABASE_SECRET)

module.exports = pool;
