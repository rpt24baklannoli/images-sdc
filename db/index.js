const Pool = require('pg').Pool;

const pool = new Pool({
  user:'gabriel.g',
  host: 'localhost',
  database: 'fetsy',
  password: '',
  port: 5432
});

module.exports = pool;