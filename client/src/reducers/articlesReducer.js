import { CHANGE_COUNTRY, FETCH_ARTICLES, SEARCH_ARTICLES, FETCH_SOURCES } from '../actions/types';

const initialState = {
  // country: window.navigator.language.split('-')[1].toLowerCase(),
  country: {
    code: 'us',
    name: 'United States',
    language: {
      code: 'en',
      name: 'English'
    }
  },
  lastQuery: '',
  sources: [],
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
    case SEARCH_ARTICLES:
      return {
        ...state,
        lastQuery: action.payload.lastQuery,
        articles: action.payload.articles
      };
    case FETCH_SOURCES:
      return {
        ...state,
        sources: action.payload
      };
    default:
      return state;
  }
}