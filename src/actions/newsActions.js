import { CHANGE_COUNTRY, FETCH_ARTICLES } from './types';
import axios from 'axios';

export const changeCountry = country => dispatch => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country
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
  //     })
  //   })
  //   .catch(err => console.warn(err))
}