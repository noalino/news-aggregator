import { AUTHENTICATE, REGISTER, LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isRegistered: false,
  info: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        info: action.payload.message
      };
    case REGISTER:
      return {
        ...state,
        isRegistered: action.payload.success,
        info: action.payload.message
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        info: ''
      }
    default:
      return state;
  }
}