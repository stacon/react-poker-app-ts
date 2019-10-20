import { combineEpics } from 'redux-observable';
import gameEpic from './Game/game.epic';
import messagesEpic from './Messages/messages.epic'
import userEpic from './User/user.epic';
import systemEpic from './System/system.epic';

const rootEpic = combineEpics(
  systemEpic,
  gameEpic,
  messagesEpic,
  userEpic,
);

export default rootEpic;