import { CHANGE_COUNTRY, CHANGE_TOPIC, FETCH_ARTICLES } from './types';
import axios from 'axios';

export const changeCountry = country => dispatch => {
  console.log('changing country');
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country
  })
}

// export const changeTopic = category => dispatch => {
//   console.log('changing topic');
//   dispatch({
//     type: CHANGE_TOPIC,
//     payload: category
//   })
// }

export const fetchArticles = (country, category) => dispatch => {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`;

  axios.get(url)
    .then(res => {
      console.log('fetching articles...');
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data.articles
      })
    })
    .catch(err => console.warn(err))
}