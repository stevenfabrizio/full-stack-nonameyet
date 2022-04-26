const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id) {
  //1 create payload
  const payload = {
    user: user_id,
  };

  //2 assign token
  jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr' });
}

module.exports = jwtGenerator;
