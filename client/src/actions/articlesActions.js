import { CHANGE_COUNTRY, FETCH_ARTICLES, SEARCH_ARTICLES, FETCH_SOURCES } from './types';
import axios from 'axios';
import { filterArticles } from '../_utils';

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
  console.log('fetching articles...');
  axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`)
    .then(({ data: { articles }}) => filterArticles(articles))
    .then(articles => {
      dispatch({
        type: FETCH_ARTICLES,
        payload: articles
      });
    })
    .catch(err => console.error(err));
}

export const searchArticles = ({...args}) => dispatch => {
  console.log('searching articles...');
  const { query, options, language } = args;
  const queryURI = encodeURIComponent(query);
  const { from, to, source, sorting } = options;

  axios.get(`https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&apiKey=${process.env.API_KEY}`)
    .then(({ data: { articles }}) => filterArticles(articles))
    .then(articles => {
      dispatch({
        type: SEARCH_ARTICLES,
        payload: {
          lastQuery: query,
          articles: articles
        }
      })
    })
    .catch(err => console.error(err))
}

export const fetchSources = country => dispatch => {

  axios.get(`https://newsapi.org/v2/sources?language=${country.language.code}&country=${country.code}&apiKey=${process.env.API_KEY}`)
    .then(({ data }) => {
      console.log('fetching sources...');
      dispatch({
        type: FETCH_SOURCES,
        payload: data.sources
      })
    })
    .catch(err => console.error(err))
}

export const displayBookmarks = bookmarks => dispatch => {
  console.log('displaying bookmarks...');
  dispatch({
    type: FETCH_ARTICLES,
    payload: bookmarks
  });
}