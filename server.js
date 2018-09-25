const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const bookmarks = require('./routes/api/bookmarks');

const app = express();
dotenv.config();


app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(morgan('combined'));

// DB config
const db = process.env.MONGODB_URI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/bookmarks', bookmarks);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));