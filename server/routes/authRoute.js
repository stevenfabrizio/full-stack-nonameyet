const pool = require('../db');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utilities/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//register router
// router.post('/register', validInfo, async (req, res) => {
router.post('/register', validInfo, async (req, res) => {
  try {
    //1 get register info
    const { name, email, password } = req.body;

    //2 check if it exists
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    //   res.json(user.rows);

    if (user.rows.length > 0) {
      return res.status(401).send('E-mail Already Exists.');
    }

    //3 bcrypt password
    const saltRound = 10; //how strong encryption
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4 enter user in our database
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword]
    );

    // 5 generating jwt token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    console.log(res.json({ jwtToken }));
    return res.json({ jwtToken });
    //
  } catch (error) {
    console.error('Exception ' + error);
    res.status(500).send('Server Error');
  }
});

//login route
// router.post('/login', validInfo, async (req, res) => {
router.post('/login', validInfo, async (req, res) => {
  try {
    //1 get login info
    const { email, password } = req.body;

    //2 see if info matches
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send('Wrong e-mail or password.');
    }

    //3 check if their password matches db password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json('Invalid login password');
    }

    //4 give them jwt token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    console.log(res.json({ jwtToken }));
    return res.json(jwtToken);
  } catch (error) {
    console.error('Exception ' + error);
  }
});

//verify route
// router.post('/verify', authorization, async (req, res) => {
router.post('/verify', authorization, async (req, res) => {
  try {
    //if person is valid, return res.json true
    res.json(true);
  } catch (error) {
    console.error('Exception ' + error);
    res.status(500).send('Not Authorized.');
  }
});

module.exports = router;
