const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  try {
    //req.user has the payload
    // res.json(req.user)

    const user = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (error) {
    console.error('Exception ' + error);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;
