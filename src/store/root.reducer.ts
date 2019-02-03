import { combineReducers } from 'redux';
import {
  indexReducer as indexView,
  gameReducer as game
} from 'src/reducers';

const rootReducer = combineReducers({
  indexView,
  game,
});

export default rootReducer;