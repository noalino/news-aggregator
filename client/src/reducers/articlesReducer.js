import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  FETCH_SOURCES,
  LOAD,
  ERROR,
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
  error: false,
  errMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload,
        error: false,
      };
    case LOAD:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        isLoading: false,
        error: false,
      };
    case SEARCH_ARTICLES:
      return {
        ...state,
        totalResults: action.payload.totalResults,
        articles: action.payload.articles,
        page: action.payload.page,
        isLoading: false,
        error: false,
      };
    case FETCH_SOURCES:
      return {
        ...state,
        sources: action.payload,
        error: false,
      };
    case ERROR:
      return {
        ...state,
        error: true,
        errMessage: action.payload,
        totalResults: 0,
        articles: [],
      };
    default:
      return state;
  }
};
