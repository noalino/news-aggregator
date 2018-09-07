import { CHANGE_COUNTRY, FETCH_ARTICLES } from '../actions/types';

const initialState = {
  // country: window.navigator.language.split('-')[1].toLowerCase(),
  country: 'pt',
  articles: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
}