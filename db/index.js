const Pool = require('pg').Pool;
//require('dotenv').config();

const pool = new Pool({
  user:'gabriel.g',
  host: 'localhost',
  database: 'fetsy',
  password: '',
  port: 5432
});

module.exports = pool;