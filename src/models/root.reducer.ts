import { combineReducers } from 'redux';
import appReducer from './App/app.reducer';
import gameReducer from './Game/game.reducer';
import userReducer from './User/user.reducer';
import messagesReducer from './Messages/messages.reducer';

const rootReducer = combineReducers({
  user : userReducer,
  app : appReducer,
  game : gameReducer,
  messages : messagesReducer,
});

export default rootReducer;