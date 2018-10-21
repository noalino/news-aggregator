import { AUTHENTICATE, REGISTER, LOGOUT, RESET, FETCH_BOOKMARKS } from '../actions/types';

const initialState = {
  isAuthenticate: false,
  isRegister: false,
  error: false,
  errMessage: '',
  bookmarks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticate: action.payload.success,
        error: !action.payload.success,
        errMessage: action.payload.message,
      };
    case REGISTER:
      return {
        ...state,
        isRegister: action.payload.success,
        error: !action.payload.success,
        errMessage: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticate: false,
        isRegister: false,
        error: false,
        errMessage: '',
        bookmarks: [],
      };
    case RESET:
      return {
        ...state,
        error: false,
        errMessage: '',
      };
    case FETCH_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    default:
      return state;
  }
};
