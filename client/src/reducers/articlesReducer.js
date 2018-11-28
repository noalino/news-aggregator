import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  FETCH_SOURCES,
  LOAD,
} from '../actions/types';

const initialState = {
  articles: [],
  isLoading: false,
  country: {
    code: 'us',
    name: 'United States',
    language: {
      code: 'en',
      name: 'English',
    },
  },
  sources: [],
  page: 1,
  pageSize: 20,
  totalResults: 0,
  errMessage: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: payload,
      };
    case LOAD:
      return {
        ...state,
        isLoading: payload,
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: payload,
        isLoading: false,
      };
    case SEARCH_ARTICLES:
      return {
        ...state,
        totalResults: payload.totalResults,
        articles: payload.articles,
        page: payload.page,
        isLoading: false,
      };
    case FETCH_SOURCES:
      return {
        ...state,
        sources: payload,
      };
    default:
      return state;
  }
};
