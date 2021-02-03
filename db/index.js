const Pool = require('pg').Pool;
require('dotenv').config({ path: '../config/.env' });

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'gabriel.g',
  host: 'localhost',
  database: 'fetsy',
  password: process.env.POSTGRES_PASSWORD || '',
  port: 5432
});

module.exports = pool;