const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

/** HELP SUPPORTING LOGIN SESSIONS */
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   Users.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.use('signup', new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.create({ username, password });
      return done(null, user, { message: 'Account created!' });
    } catch (err) {
      // Code for duplicate keys
      if (err.code === 11000) {
        return done(null, false, { message: `Username ${username} is already taken.` });
      }
      return done(err);
    }
  }
));

passport.use('login', new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }

      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user, { message: `You are now logged in!` });

    } catch (err) {
      return done(err);
    }
  }
));

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
  secretOrKey: process.env.SECRET_JWT,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (err) {
    return done(err);
  }
}));