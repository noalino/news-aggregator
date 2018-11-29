import axios from 'axios';
import { AUTHENTICATE, REGISTER, LOGOUT, ERROR_MESSAGE, RESET, FETCH_BOOKMARKS } from './types';

const authenticate = () => (dispatch) => {
  axios.post('api/authenticate', {}, { withCredentials: true })
    .then(({ data: status }) => {
      dispatch({
        type: AUTHENTICATE,
        payload: status,
      });
    })
    .catch(err => console.error(err));
};

const logIn = credentials => (dispatch) => {
  axios.post('api/login', { ...credentials }, { withCredentials: true })
    .then(({ data: status }) => {
      dispatch({
        type: AUTHENTICATE,
        payload: status,
      });
    })
    .catch(err => console.error(err));
};

const signUp = credentials => (dispatch) => {
  axios.post('api/signup', { ...credentials })
    .then(({ data: status }) => {
      dispatch({
        type: REGISTER,
        payload: status,
      });
    })
    .catch(err => console.error(err));
};

const logOut = () => (dispatch) => {
  axios.post('api/logout', {}, { withCredentials: true })
    .then(() => {
      dispatch({
        type: LOGOUT,
      });
    })
    .catch(err => console.error(err));
};

const setErrorMessage = message => dispatch => (
  dispatch({
    type: ERROR_MESSAGE,
    payload: message,
  })
);

const resetLogin = () => dispatch => dispatch({ type: RESET });

const fetchBookmarks = () => (dispatch) => {
  axios.get('api/user/bookmarks', { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data,
      });
    })
    .catch(err => console.error(err));
};

const addBookmark = article => (dispatch) => {
  axios.post('api/user/bookmarks', { article }, { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data,
      });
    })
    .catch(err => console.error(err));
};

const deleteBookmark = id => (dispatch) => {
  axios.put('api/user/bookmarks', { id }, { withCredentials: true })
    .then(({ data }) => {
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
  setErrorMessage,
  resetLogin,
  fetchBookmarks,
  addBookmark,
  deleteBookmark,
};
