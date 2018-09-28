const express = require('express');
// const session = require('express-session');
// const sessionStore = new session.MemoryStore();
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const errorHandler = require('./_helpers/error-handler');

const app = express();
dotenv.config();

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200
// }));

app.use(helmet());
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

// app.use(session({
//   // store: isProduction ?
//   //   new MongoStore({
//   //     mongooseConnection: mongoose.connection
//   //   }) : sessionStore,
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.SESSION_SECRET
// }));

// app.use(passport.initialize());

/** TO BE USED FOR PERSISTENT LOGIN SESSIONS */
// app.use(passport.session());

// Authentication to secure the api
require('./config/passport');

// Routes
const publicRoutes = require('./routes/api');
const privateRoutes = require('./routes/secure-api');

app.use('/api', publicRoutes);
app.use('/api/user', passport.authenticate('jwt', { session: false }), privateRoutes);

// Global error handler
app.use(errorHandler);

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));