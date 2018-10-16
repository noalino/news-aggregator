const passport = require('passport');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { getJwtHeaderPayload, getJwtSignature } = require('../_helpers/cookieHandler');

const authenticate = async ({ user }, res) => {
  res.json({
    success: user ? true : false,
    message: ''
  });
};

const signUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, { message }) => {
    try {
      if (err) { return next(err); }

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
          algorithm: 'RS256'
        };
        const token = await jwt.sign(payload, privateKey, options);
        
        res.cookie('jwt_header&payload', getJwtHeaderPayload(token), {
          // secure: true,
          maxAge: 1000 * 60 * 30, // 30mn
          sameSite: true
        });
        res.cookie('jwt_signature', getJwtSignature(token), {
          // secure: true,
          httpOnly: true,
          sameSite: true
        });
        res.json({
          success: true,
          message
        });
      });
    } catch (err) { return next(err); }
  })(req, res, next);
};

const logOut = (req, res) => {
  req.logout();
  res.clearCookie('jwt_header&payload');
  res.end();
}

module.exports = {
  authenticate,
  signUp,
  logIn,
  logOut
}