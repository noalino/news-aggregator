import axios from 'axios';
import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  NEXT_SEARCH_ARTICLES,
  UPDATE_OPTIONS,
  FETCH_SOURCES,
  ERROR,
} from './types';
import { generateArticleId, filterArticles } from '../_utils';
import jsonResponse from '../data';

export const changeCountry = country => (dispatch) => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country,
  });
};

export const resetArticles = () => (dispatch) => {
  console.log('reset lastQuery & totalResults & empty articles list');
  dispatch({
    type: SEARCH_ARTICLES,
    payload: {
      totalResults: 0,
      articles: [],
    },
  });
};

export const fetchArticles = (country, category) => (dispatch) => {
  console.log('fetching articles...');
  axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`)
    .then(({ data: { articles } }) => {
      generateArticleId(articles);
      return filterArticles(articles);
    })
    .then(articles => (
      dispatch({
        type: FETCH_ARTICLES,
        payload: articles,
      })
    ))
    .catch(err => console.error(err));
  // dispatch({
  //   type: FETCH_ARTICLES,
  //   payload: jsonResponse.all.articles,
  // });
};

export const updateOptions = options => dispatch => (
  dispatch({
    type: UPDATE_OPTIONS,
    payload: { ...options },
  })
);

export const searchArticles = ({ ...args }) => (dispatch) => {
  console.log('searching articles...');
  const { query, options, language, pageSize } = args;
  const queryURI = encodeURIComponent(query);
  const { from, to, source, sorting } = options;

  axios.get(`https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&pageSize=${pageSize}&page=1&apiKey=${process.env.API_KEY}`)
    .then(({ data: { totalResults, articles } }) => {
      generateArticleId(articles);
      const newArticles = filterArticles(articles);
      return {
        newArticles,
        totalResults,
      };
    })
    .then(({ totalResults, newArticles }) => (
      dispatch({
        type: SEARCH_ARTICLES,
        payload: {
          page: 1,
          totalResults,
          articles: newArticles,
        },
      })
    ))
    .catch(() => (
      dispatch({
        type: ERROR,
        payload: 'Sorry, we could not handle your request.',
      })
    ));

  // dispatch({
  //   type: SEARCH_ARTICLES,
  //   payload: {
  //     page: 1,
  //     totalResults: 20,
  //     articles: jsonResponse.business.articles,
  //   },
  // });
};

export const loadNextPage = ({ ...args }) => (dispatch) => {
  console.log('loading next page...');
  const { articles, query, options, language, page, pageSize } = args;
  const queryURI = encodeURIComponent(query);
  const { from, to, source, sorting } = options;
  const nextPage = page + 1;

  axios.get(`https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&pageSize=${pageSize}&page=${nextPage}&apiKey=${process.env.API_KEY}`)
    .then(({ data: { totalResults, articles: nextArticles } }) => {
      generateArticleId(nextArticles);
      const newArticles = filterArticles(articles.concat(nextArticles));
      return {
        newArticles,
        totalResults,
      };
    })
    .then(({ totalResults, newArticles }) => (
      dispatch({
        type: NEXT_SEARCH_ARTICLES,
        payload: {
          page: nextPage,
          totalResults,
          articles: newArticles,
        },
      })
    ))
    .catch(err => console.error(err));
};

export const fetchSources = ({ country, language }) => (dispatch) => {
  console.log('fetching sources...');
  axios.get(`https://newsapi.org/v2/sources?language=${language}&country=${country}&apiKey=${process.env.API_KEY}`)
    .then(({ data: { sources } }) => (
      dispatch({
        type: FETCH_SOURCES,
        payload: sources,
      })
    ))
    .catch(err => console.error(err));
};

export const displayBookmarks = bookmarks => dispatch => (
  dispatch({
    type: FETCH_ARTICLES,
    payload: bookmarks,
  })
);
