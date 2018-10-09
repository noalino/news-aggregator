const passport = require('passport');

const verify_user = (req, res, next) => {
  passport.authenticate('jwt', (err, payload, info) => {
    if (err || info) {
      // next(new Error('Unauthorized'));
      req.user = false;
      next();
    } else {
      req.user = payload;
      // ADD NEW 30 MINUTES
      res.cookie('jwt_header&payload', req.cookies['jwt_header&payload'], {
        // secure: true,
        maxAge: 1000 * 60 * 30, // 30mn
        sameSite: true
      });
      next();
    }
  })(req, res, next);
};

module.exports = verify_user;