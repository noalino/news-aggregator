import { AUTHENTICATE, REGISTER, LOGOUT, FETCH_BOOKMARKS } from './types';
import axios from 'axios';

const secret_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViYjM5MzRmMGU1ZTZmNjFiNTcyYjUyNSJ9LCJpYXQiOjE1Mzg0OTU0MDJ9.EWdBY4qTNd7HyU6NReKO1uO6KOUZHEP278jxdFXmNHg';

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

const fetchBookmarks = () => dispatch => {

  axios.get(`http://localhost:5000/api/user/bookmarks`,
    {
      headers: { 'Authorization': `Bearer ${secret_token}` }
    }
  ).then(({ data }) => {
      console.log('fetching bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data
      });
    })
    .catch(err => console.error(err))
}

const addBookmark = article => dispatch => {

  axios.post(`http://localhost:5000/api/user/bookmarks`,
    { article },
    {
      headers: { 'Authorization': `Bearer ${secret_token}` }
    }
  ).then(({ data }) => {
      console.log('updating bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data
      })
    })
    .catch(err => console.error(err))
}

const deleteBookmark = id => dispatch => {

  axios.put(`http://localhost:5000/api/user/bookmarks`,
    { id },
    {
      headers: { 'Authorization': `Bearer ${secret_token}` }
    }
  ).then(({ data }) => {
      console.log('updating bookmarks...');
      dispatch({
        type: FETCH_BOOKMARKS,
        payload: data
      })
    })
    .catch(err => console.error(err))
}

// const resetBookmarks = () => dispatch => {
//   dispatch({
//     type: FETCH_BOOKMARKS,
//     payload: []
//   })
// }

module.exports = {
  logIn,
  signUp,
  logOut,
  fetchBookmarks,
  addBookmark,
  deleteBookmark,
  // resetBookmarks
}