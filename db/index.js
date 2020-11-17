const Pool = require('pg').Pool;

const pool = new Pool({
  user:'brian.vu',
  host: 'localhost',
  database: 'images',
  password: '',
  port: 5432
})

module.exports = pool;