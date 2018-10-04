import { AUTHENTICATE, REGISTER, LOGOUT } from './types';
import axios from 'axios';

const logIn = credentials => dispatch => {
  axios.post('http://localhost:5000/api/login', { ...credentials })
    .then(({ data: status }) => {
      dispatch({
        type: AUTHENTICATE,
        payload: status
      })
      console.log('login status: ', status);
    })
    .catch(err => console.error(err))
};

const signUp = credentials => dispatch => {
  axios.post('http://localhost:5000/api/signup', { ...credentials })
    .then(({ data: status }) => {
      dispatch({
        type: REGISTER,
        payload: status
      })
      console.log('signup status: ', status);
    })
    .catch(err => console.error(err))
};

const logOut = () => dispatch => {
  axios.post('http://localhost:5000/api/logout')
    .then(() => {
      dispatch({
        type: LOGOUT
      })
    })
    .catch(err => console.error(err))
};

module.exports = {
  logIn,
  signUp,
  logOut
}