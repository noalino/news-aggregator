const passport = require('passport');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, { message }) => {
    try {
      if (err) { return next(err); }
      // if (!user) {
      //   return res.json({
      //     success: false,
      //     message
      //   });
      // }

      res.json({
        success: user ? true : false,
        message
      });

    } catch (err) { return next(err); }
  })(req, res, next);
};

const logIn = async (req, res, next) => {
  passport.authenticate('login', async (err, user, { message }) => {
    try {
      if (err) { return next(err); }
      if (!user) {
        return res.json({
          success: false,
          message
        });
      }

      req.login(user, { session: false }, async error => {
        if (error) { return next(error); }
        
        const payload = { _id: user.id };
        const privateKey = await fs.readFileSync('./private.key', 'utf8');
        const options = {
          issuer: 'Benoit Corp',
          audience: 'http://localhost:8080',
          expiresIn: '12h',
          algorithm: 'RS256'
        };
        const token = await jwt.sign(payload, privateKey, options);
        
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true,
            // domain: 'localhost',
            maxAge: 1000 * 60 * 60 * 12 // 12h
          })
          .json({
            success: true,
            message,
            token
          });
      });
    } catch (err) { return next(err); }
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