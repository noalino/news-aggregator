import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import userReducer from './userReducer';

export default combineReducers({
  articles: articlesReducer,
  user: userReducer,
});
