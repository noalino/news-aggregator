import {
  TOGGLE_SIDEBAR,
} from '../actions/types';

const initialState = {
  sidebarOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    default:
      return state;
  }
};
