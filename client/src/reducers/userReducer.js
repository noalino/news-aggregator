import { AUTHENTICATE, REGISTER, LOGOUT, ERROR_MESSAGE, RESET, FETCH_BOOKMARKS } from '../actions/types';

const initialState = {
  isAuthenticate: false,
  isRegister: false,
  error: false,
  errMessage: '',
  bookmarks: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticate: payload.success,
        error: !payload.success,
        errMessage: payload.message || '',
      };
    case REGISTER:
      return {
        ...state,
        isRegister: payload.success,
        error: !payload.success,
        errMessage: payload.message || '',
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
    case ERROR_MESSAGE:
      return {
        ...state,
        errMessage: payload,
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
        bookmarks: payload,
      };
    default:
      return state;
  }
};
