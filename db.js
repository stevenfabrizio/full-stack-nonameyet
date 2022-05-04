const Pool = require('pg').Pool;

//note about below
//comment out PART 2 for local environment. uncomment PART 1

// DEVELOPMENT MODE
const pool = new Pool({
  user: 'postgres',
  password: 'idk',
  host: 'localhost',
  port: 5432,
  database: 'fullstacker',
});

//PRODUCTION MODE
// const proConfig = process.env.DATABASE_URL; //heroku addons

// const pool = new Pool({
//   connectionString: proConfig,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

module.exports = pool;
