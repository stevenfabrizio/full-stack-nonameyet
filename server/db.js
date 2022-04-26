const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'idk',
  port: 5432,
  host: 'localhost',
  database: 'fullstacker',
});

module.exports = pool;
