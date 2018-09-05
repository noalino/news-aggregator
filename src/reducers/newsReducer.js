import { FETCH_ARTICLES } from '../actions/types';

const initialState = {
  country: window.navigator.language.split('-')[1],
  category: '',
  articles: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        category: action.payload.category,
        articles: action.payload.articles
      };
    default:
      return state;
  }
}