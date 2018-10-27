import axios from 'axios';
import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  FETCH_SOURCES,
  ERROR,
} from './types';
import { fetchUtils, searchUtils, loadNextUtils } from '../_utils';

export const changeCountry = country => (dispatch) => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country,
  });
};

export const resetArticles = () => (dispatch) => {
  console.log('reset totalResults & empty articles list');
  dispatch({
    type: SEARCH_ARTICLES,
    payload: {
      totalResults: 0,
      articles: [],
    },
  });
};

export const fetchArticles = (articles, country, category) => async (dispatch) => {
  console.log('fetching articles');
  // const url = 'src/data/data_all.json';
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`;
  try {
    const res = await axios.get(url);
    const { articles: newArticles } = res.data;
    const payload = await fetchUtils({ articles, newArticles });

    dispatch({
      type: FETCH_ARTICLES,
      payload,
    });
  } catch (err) {
    // console.error(err);
    dispatch({
      type: ERROR,
      payload: '404 Not Found',
    });
  }
};

/*
  CREATE FUNCTION TO GENERATE PARAMS FOR API URL (LIKE SEARCH URL)
*/
export const searchArticles = ({ ...args }) => async (dispatch) => {
  try {
    console.log('searching articles...');
    const { query, options, language, pageSize } = args;
    const queryURI = encodeURIComponent(query);
    const { from, to, source, sortBy } = options;
    const sorting = sortBy === 'date' ? 'publishedAt' : sortBy;
    // const url = 'src/data/page1.json';
    const url = `https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&pageSize=${pageSize}&page=1&apiKey=${process.env.API_KEY}`;

    const res = await axios.get(url);
    const { totalResults, articles: newArticles } = res.data;
    const articles = await searchUtils(newArticles);

    dispatch({
      type: SEARCH_ARTICLES,
      payload: {
        page: 1,
        totalResults,
        articles,
      },
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: 'Sorry, we could not handle your request.',
    });
  }
};

export const loadNextPage = ({ ...args }) => async (dispatch) => {
  try {
    console.log('loading next page...');
    const {
      articles,
      query,
      from,
      to,
      source,
      sortBy,
      language,
      page,
      pageSize,
    } = args;
    const queryURI = encodeURIComponent(query);
    const sorting = sortBy === 'date' ? 'publishedAt' : sortBy;
    const nextPage = page + 1;
    // const url = 'src/data/page2.json';
    const url = `https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&pageSize=${pageSize}&page=${nextPage}&apiKey=${process.env.API_KEY}`;

    const res = await axios.get(url);
    const { totalResults, articles: newArticles } = res.data;
    const nextArticles = await loadNextUtils({ articles, newArticles });

    dispatch({
      type: SEARCH_ARTICLES,
      payload: {
        page: nextPage,
        totalResults,
        articles: nextArticles,
      },
    });
  } catch (err) {
    console.error(err);
  }
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
