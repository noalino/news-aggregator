import { CHANGE_COUNTRY, FETCH_ARTICLES, SEARCH_ARTICLES, FETCH_SOURCES } from './types';
import axios from 'axios';

export const changeCountry = country => dispatch => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country
  })
}

export const resetArticles = () => dispatch => {
  console.log('reset lastQuery & empty articles list');
  dispatch({
    type: SEARCH_ARTICLES,
    payload: {
      lastQuery: '',
      articles: []
    }
  })
}

export const fetchArticles = (country, category) => dispatch => {
  // console.log('fetching articles...');
  axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`)
    .then(res => {
      console.log('fetching articles...');
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data.articles
      });
    })
    .catch(err => console.error(err))
}

export const searchArticles = ({...args}) => dispatch => {
  // console.log('searching articles...');
  const { query, options, language } = args;
  const queryURI = encodeURIComponent(query);
  const { from, to, source, sorting } = options;

  axios.get(`https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&apiKey=${process.env.API_KEY}`)
    .then(res => {
      console.log('searching articles...');
      dispatch({
        type: SEARCH_ARTICLES,
        payload: {
          lastQuery: query,
          articles: res.data.articles
        }
      })
    })
    .catch(err => console.error(err))

  // dispatch({
  //   type: SEARCH_ARTICLES,
  //   payload: {
  //     lastQuery: query,
  //     articles: []
  //   }
  // })
}

export const fetchSources = country => dispatch => {

  axios.get(`https://newsapi.org/v2/sources?language=${country.language.code}&country=${country.code}&apiKey=${process.env.API_KEY}`)
    .then(res => {
      console.log('fetching sources...');
      dispatch({
        type: FETCH_SOURCES,
        payload: res.data.sources
      })
    })
    .catch(err => console.error(err))
}

const secret_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViYWZhNzYzMGZiYmVhMmYyYTVkNmI3NCIsInVzZXJuYW1lIjoiYmVub2l0In0sImlhdCI6MTUzODM5NjM1NX0.IwfrJCcaTYBQ0iVbiC0dyDiV3mTYf6IN_ldJIOFFbgg';

export const fetchBookmarks = () => dispatch => {

  axios.get(`http://localhost:5000/api/user/bookmarks`, {
    headers: { 'Authorization': `Bearer ${secret_token}` }
  })
    .then(res => {
      console.log('fetching bookmarks...');
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
      });
    })
    .catch(err => console.error(err))
}

export const addBookmark = article => dispatch => {

  axios.post(`http://localhost:5000/api/user/bookmarks`,
  { article },
  {
    headers: { 'Authorization': `Bearer ${secret_token}` }
  })
    .then(res => {
      console.log('fetching bookmarks...');
      console.log(res.data);
      // dispatch({
      //   type: FETCH_ARTICLES,
      //   payload: res.data
      // })
    })
    .catch(err => console.error(err))
}

export const deleteBookmark = id => dispatch => {

  axios.put(`http://localhost:5000/api/user/bookmarks/${id}`, {}, {
    headers: { 'Authorization': `Bearer ${secret_token}` }
  })
    .then(res => {
      console.log('fetching bookmarks...');
      console.log(res.data);
      // dispatch({
      //   type: FETCH_ARTICLES,
      //   payload: res.data
      // })
    })
    .catch(err => console.error(err))
}