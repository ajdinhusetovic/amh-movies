const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');

dotenv.config({ path: './config.env' });

const app = express();

// Enables receiving JSON in request
app.use(express.json());

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

app.use('/api/v1/users', userRouter);

mongoose.connect(DB).then(() => {
  console.log('DB connection established');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
