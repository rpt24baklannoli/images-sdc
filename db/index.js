const Pool = require('pg').Pool;

const pool = new Pool({
  user:'brian.vu',
  host: 'localhost',
  database: 'images',
  password: 'sr20pl510!',
  port: 5432
})

module.exports = pool;