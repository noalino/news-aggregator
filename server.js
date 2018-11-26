const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const publicRoutes = require('./routes/api');
const privateRoutes = require('./routes/secure-api');

// Middlewares
const verify_user = require('./routes/auth');
const errorHandler = require('./_helpers/error-handler');

const app = express();
dotenv.config();

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';
const { APP_URL } = process.env;

app.use(cors({
  origin: APP_URL,
  optionsSuccessStatus: 200,
  credentials: true // To receive cookies from client
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(passport.initialize());

// Passport authentication to secure the api
require('./config/passport');

app.use('/api', publicRoutes);
app.use('/api/user', verify_user, privateRoutes);

// Global error handler
app.use(errorHandler);

// Serve static assets if in production
if (isProduction) {
  // Set headers to read compressed js file
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  // Set headers to read compressed css file
  app.get('*.css', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });

  // Set static folder
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  // Set path to all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));