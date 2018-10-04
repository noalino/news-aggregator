const passport = require('passport');
const jwt = require('jsonwebtoken');

const signUp = async ({ user }, res, next) => {
  return res.json({
    success: true,
    // message: `Welcome ${user.username}!`
    message: 'Account created!'
  });
};

const logIn = async (req, res, next) => {
  passport.authenticate('login', async (err, user, { message }) => {
    try {
      if (err) { return next(err); }
      if (!user) { return next(message); }

      req.login(user, { session: false }, async error => {
        if (error) { return next(error); }
        const body = {
          _id: user.id,
          // username: user.username
        };
        const token = await jwt.sign({ user: body }, process.env.SECRET_JWT);
        return res.json({
          success: true,
          message,
          token
        });
      });

    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

const logOut = (req, res, next) => {
  req.logout();
  res.json({ message: 'You are now logged out.'});
}

module.exports = {
  signUp,
  logIn,
  logOut
}