const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(cors());

//routes
const authRoute = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboard');
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
