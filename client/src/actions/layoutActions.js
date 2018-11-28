import { TOGGLE_SIDEBAR } from './types';

const toggleSidebar = isOpen => dispatch => dispatch({
  type: TOGGLE_SIDEBAR,
  payload: isOpen,
});

export default toggleSidebar;
