const cookieExtractor = req => (req && req.cookies) ? req.cookies['token'] : null;
// const cookieExtractor = req => {
//   let token = null;
//   if (req && req.cookies) {
//     // console.log('req', req);
//     console.log('cookies', req.cookies);
//     console.log('token', req.cookies['token']);
//     token = req.cookies['token'];
//   }
//   return token;
// }

module.exports = cookieExtractor;