import { FETCH_ARTICLES } from './types';
import axios from 'axios';

export const fetchArticles = (category) => dispatch => {
  // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.API_KEY}`;

  axios.get(url)
    .then(res => {
      console.log('fetching articles...');
      dispatch({
        type: FETCH_ARTICLES,
        payload: {
          articles: res.data.articles
        }
    })})
    .catch(err => console.warn(err))
}