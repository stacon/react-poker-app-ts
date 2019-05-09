import { combineEpics } from 'redux-observable';
import gameEpic from './Game/game.epic';
import messagesEpic from './Messages/messages.epic'
import userEpic from './User/user.epic';

const rootEpic = combineEpics(
 gameEpic,
 messagesEpic,
 userEpic,
);

export default rootEpic;