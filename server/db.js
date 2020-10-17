const Pool = require('pg').Pool
const config = require('config')

const pool = ({
    user: 'allen',
    password: config.get('psqlSecret')
})