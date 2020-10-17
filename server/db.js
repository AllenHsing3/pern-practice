const Pool = require('pg').Pool
const config = require('config')

const pool = new Pool ({
    user: 'allen',
    password: config.get('psqlSecret'),
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
})

module.exports = pool