import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import authReducer from './authReducer';

export default combineReducers({
  news: newsReducer,
  auth: authReducer
});