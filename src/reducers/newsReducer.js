import { CHANGE_COUNTRY, CHANGE_TOPIC, FETCH_ARTICLES } from '../actions/types';

const initialState = {
  country: window.navigator.language.split('-')[1].toLowerCase(),
  // category: 'general',
  articles: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload
      };
    // case CHANGE_TOPIC:
    //   return {
    //     ...state,
    //     category: action.payload
    //   };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
}