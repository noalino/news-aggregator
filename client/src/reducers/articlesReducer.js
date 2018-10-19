import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  NEXT_SEARCH_ARTICLES,
  FETCH_SOURCES,
  UPDATE_OPTIONS,
} from '../actions/types';

const initialState = {
  articles: [],
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
  options: {
    from: '',
    to: '',
    source: '',
    sorting: 'publishedAt',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SEARCH_ARTICLES:
      return {
        ...state,
        totalResults: action.payload.totalResults,
        articles: action.payload.articles,
        page: action.payload.page,
      };
    case NEXT_SEARCH_ARTICLES:
      return {
        ...state,
        totalResults: action.payload.totalResults,
        articles: action.payload.articles,
        page: action.payload.page,
      };
    case FETCH_SOURCES:
      return {
        ...state,
        sources: action.payload,
      };
    case UPDATE_OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    default:
      return state;
  }
};
