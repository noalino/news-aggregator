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
      // console.log('articles', res.data.articles);
      dispatch({
        type: SEARCH_ARTICLES,
        payload: {
          lastQuery: query,
          articles: res.data.articles
          // articles: []
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