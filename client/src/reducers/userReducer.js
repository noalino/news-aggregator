import { AUTHENTICATE, REGISTER, LOGOUT, FETCH_BOOKMARKS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isRegistered: false,
  error: false,
  message: '',
  bookmarks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        error: !action.payload.success,
        message: action.payload.message
      };
    case REGISTER:
      return {
        ...state,
        isRegistered: action.payload.success,
        error: !action.payload.success,
        message: action.payload.message
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        message: '',
        bookmarks: []
      };
    case FETCH_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload
      };
    default:
      return state;
  }
}