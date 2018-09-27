const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const errorHandler = require('_helpers/error-handler');

const api = require('./routes/api');

const app = express();
dotenv.config();

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200
// }));

app.use(helmet());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use(morgan('combined'));

// DB config
const db = process.env.MONGODB_URI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// mongoose.Promise = global.Promise;

app.use('/api', api);

// global error handler
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));