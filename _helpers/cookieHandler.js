const cookieExtractor = ({ cookies }) => (
  (cookies['jwt_header&payload'] && cookies['jwt_signature']) ?
 `${cookies['jwt_header&payload']}.${cookies['jwt_signature']}` : null
 );

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