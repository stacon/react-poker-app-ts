import { combineReducers } from 'redux';
import {
  userReducer as user,
  homeViewReducer as homeView,
  gameViewReducer as gameView
} from 'src/reducers';

const rootReducer = combineReducers({
  user,
  homeView,
  gameView,
});

export default rootReducer;