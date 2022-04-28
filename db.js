const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'idk',
  host: 'localhost',
  port: 5432,
  database: 'fullstacker',
});

// const proConfig = process.env.DATABASE_URL; //heroku addons

// const pool = new Pool({
//   connectionString: proConfig,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

module.exports = pool;
