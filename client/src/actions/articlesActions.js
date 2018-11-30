import axios from 'axios';
import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  FETCH_SOURCES,
  LOAD,
} from './types';
import {
  extractParams,
  setParams,
  fetchAction,
  searchAction,
  loadNextAction,
} from '../_utils';

const { NODE_ENV } = process.env;
const { API_KEY } = process.env;

export const changeCountry = country => dispatch => (
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country,
  })
);

export const resetArticles = () => dispatch => (
  dispatch({
    type: SEARCH_ARTICLES,
    payload: {
      totalResults: 0,
      articles: [],
    },
  })
);

export const getHeadlines = args => async (dispatch) => {
  try {
    const { articles, country, topic } = args;
    const params = { country, category: topic, apiKey: API_KEY };
    const url = NODE_ENV === 'production' ? (
      `https://newsapi.org/v2/top-headlines?${setParams(params)}`
    ) : (
      'src/data/data_all.json'
    );
    const res = await axios.get(url);
    const { articles: newArticles } = res.data;
    const payload = await fetchAction({ articles, newArticles });

    dispatch({
      type: FETCH_ARTICLES,
      payload,
    });
  } catch (err) {
    console.error(err);
  }
};

export const searchArticles = args => async (dispatch) => {
  try {
    const params = await extractParams(args);
    const request = await setParams(params);
    const url = NODE_ENV === 'production' ? (
      `https://newsapi.org/v2/everything?${request}`
    ) : (
      'src/data/page1.json'
    );
    const res = await axios.get(url);
    const { totalResults, articles: newArticles } = res.data;
    const articles = await searchAction(newArticles);

    dispatch({
      type: SEARCH_ARTICLES,
      payload: {
        page: 1,
        totalResults,
        articles,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const searchNextArticles = ({ articles, page: prevPage, ...args }) => async (dispatch) => {
  try {
    const page = prevPage + 1;
    const params = await extractParams({ page, ...args });
    const request = await setParams(params);
    const url = `https://newsapi.org/v2/everything?${request}`;
    const res = await axios.get(url);
    const { totalResults, articles: newArticles } = res.data;
    const nextArticles = await loadNextAction({ articles, newArticles });

    dispatch({
      type: SEARCH_ARTICLES,
      payload: {
        page,
        totalResults,
        articles: nextArticles,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticles = (action, args) => async (dispatch) => {
  try {
    await dispatch({
      type: LOAD,
      payload: true,
    });
    action(args);
  } catch (err) {
    console.error(err);
  }
};

export const fetchSources = ({ country, language }) => async (dispatch) => {
  const params = { country, language, apiKey: API_KEY };
  const request = await setParams(params);
  axios.get(`https://newsapi.org/v2/sources?${request}`)
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
