import { combineReducers } from 'redux';
import appReducer from './App/app.reducer';
import gameReducer from './Game/game.reducer';
import userReducer from './User/user.reducer';

const rootReducer = combineReducers({
  user : userReducer,
  app : appReducer,
  game : gameReducer,
});

export default rootReducer;