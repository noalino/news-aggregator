const passport = require('passport');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { user } = req;
  return res.json({
    message: 'Successfully created new user',
    user
  });
};

const logIn = async (req, res, next) => { // Personalize error handling
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) { return next(error); }
        const body = { _id: user.id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.SECRET_JWT);
        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

module.exports = {
  signUp,
  logIn
}