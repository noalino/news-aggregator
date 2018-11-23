import { TOGGLE_SIDEBAR } from '../actions/types';

const initialState = {
  sidebarOpen: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: payload,
      };
    default:
      return state;
  }
};
