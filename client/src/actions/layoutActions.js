import { TOGGLE_SIDEBAR } from './types';

export const toggleSidebar = (isOpen) => (dispatch) => dispatch({
  type: TOGGLE_SIDEBAR,
  payload: isOpen,
});
