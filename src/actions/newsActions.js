import { CHANGE_COUNTRY, FETCH_ARTICLES, SEARCH_ARTICLES, FETCH_SOURCES } from './types';
import axios from 'axios';

export const changeCountry = country => dispatch => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country
  })
}

export const emptyArticles = () => dispatch => {
  console.log('empty articles list');
  dispatch({
    type: FETCH_ARTICLES,
    payload: []
  })
}

export const fetchArticles = (country, category) => dispatch => {
  console.log('fetching articles...');
  // axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`)
  //   .then(res => {
  //     console.log('fetching articles...');
  //     dispatch({
  //       type: FETCH_ARTICLES,
  //       payload: res.data.articles
  //     });
  //   })
  //   .catch(err => console.error(err))
}

export const searchArticles = ({...args}) => dispatch => {
  console.log('searching articles...');
  const { query, options, language } = args;

  // if (query === '') {
    dispatch({
      type: SEARCH_ARTICLES,
      payload: {
        lastQuery: query,
        articles: []
      }
    })
  // } else {
  //   const queryURI = encodeURIComponent(query);
  //   const { from, to, source, sorting } = options;
  
  //   axios.get(`https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&apiKey=${process.env.API_KEY}`)
  //     .then(res => {
  //       console.log('searching articles...');
  //       dispatch({
  //         type: SEARCH_ARTICLES,
  //         payload: {
  //           lastQuery: query,
  //           articles: res.data.articles
  //         }
  //       })
  //     })
  //     .catch(err => console.error(err))
  // }
}

export const fetchSources = language => dispatch => {

  axios.get(`https://newsapi.org/v2/sources?language=${language}&apiKey=${process.env.API_KEY}`)
    .then(res => {
      console.log('fetching sources...');
      dispatch({
        type: FETCH_SOURCES,
        payload: res.data.sources
      })
    })
    .catch(err => console.error(err))
}