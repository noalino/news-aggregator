import axios from 'axios';
import { AUTHENTICATE, REGISTER, LOGOUT, RESET, FETCH_BOOKMARKS } from './types';

const authenticate = () => (dispatch) => {
  axios.post('http://localhost:5000/api/authenticate', {}, { withCredentials: true })
    .then(({ data: status }) => {
      dispatch({
        type: AUTHENTICATE,
        payload: status,
      });
      // console.log('authenticate status: ', status);
    })
    .catch(err => console.error(err));
};

const logIn = credentials => (dispatch) => {
  axios.post('http://localhost:5000/api/login', { ...credentials }, { withCredentials: true })
    .then(({ data: status }) => {
      dispatch({
        type: AUTHENTICATE,
        payload: status,
      });
      // console.log('login status: ', status);
    })
    .catch(err => console.error(err));
};

const signUp = credentials => (dispatch) => {
  axios.post('http://localhost:5000/api/signup', { ...credentials })
    .then(({ data: status }) => {
      dispatch({
        type: REGISTER,
        payload: status,
      });
      // console.log('signup status: ', status);
    })
    .catch(err => console.error(err));
};

const logOut = () => (dispatch) => {
  axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
    .then(() => {
      dispatch({
        type: LOGOUT,
      });
    })
    .catch(err => console.error(err));
};

const resetLogin = () => dispatch => dispatch({ type: RESET });

const fetchBookmarks = () => (dispatch) => {
  axios.get('http://localhost:5000/api/user/bookmarks', { withCredentials: true })
    .then(({ data }) => {
      console.log('fetching bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data,
      });
    })
    .catch(err => console.error(err));
};

const addBookmark = article => (dispatch) => {
  axios.post('http://localhost:5000/api/user/bookmarks', { article }, { withCredentials: true })
    .then(({ data }) => {
      console.log('updating bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data,
      });
    })
    .catch(err => console.error(err));
};

const deleteBookmark = id => (dispatch) => {
  axios.put('http://localhost:5000/api/user/bookmarks', { id }, { withCredentials: true })
    .then(({ data }) => {
      console.log('updating bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data,
      });
    })
    .catch(err => console.error(err));
};

export {
  authenticate,
  logIn,
  signUp,
  logOut,
  resetLogin,
  fetchBookmarks,
  addBookmark,
  deleteBookmark,
};
