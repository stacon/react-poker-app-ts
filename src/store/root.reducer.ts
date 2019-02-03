import { combineReducers } from 'redux';
import {
  userReducer as user,
  indexReducer as indexView,
  gameReducer as game
} from 'src/reducers';

const rootReducer = combineReducers({
  user,
  indexView,
  game,
});

export default rootReducer;