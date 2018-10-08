const cookieExtractor = ({ cookies }) => (cookies['jwt_header&payload'] && cookies['jwt_signature']) ?
 `${cookies['jwt_header&payload']}.${cookies['jwt_signature']}` : null;
// const cookieExtractor = ({ cookies }) => {
//   let token = null;
//   if (cookies['jwt_header&payload'] && cookies['jwt_signature']) {
//     // console.log('cookies:', cookies);
//     // console.log(cookies['jwt_header&payload']);
//     // console.log(cookies['jwt_signature']);
//     token = `${cookies['jwt_header&payload']}.${cookies['jwt_signature']}`;
//   }
//   // console.log('token:', token);
//   return token;
// };

const getJwtHeaderPayload = token => {
  const array = token.split('.');
  array.pop();
  return array.join('.');
};

const getJwtSignature = token => token.split('.')[2];

module.exports = {
  cookieExtractor,
  getJwtHeaderPayload,
  getJwtSignature
};