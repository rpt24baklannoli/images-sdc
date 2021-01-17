const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user:'brian.vu',
  host: 'localhost',
  database: 'images',
  password: '',
  port: 5432
})

module.exports = pool;