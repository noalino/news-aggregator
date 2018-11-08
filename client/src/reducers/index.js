import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import layoutReducer from './layoutReducer';
import userReducer from './userReducer';

export default combineReducers({
  articles: articlesReducer,
  layout: layoutReducer,
  user: userReducer,
});
