import { combineEpics } from 'redux-observable';
import gameEpic from './Game/game.epic';
import messagesEpic from './Messages/messages.epic'
import userEpic from './User/user.epic';
import appEpic from './App/app.epic';

const rootEpic = combineEpics(
 appEpic,
 gameEpic,
 messagesEpic,
 userEpic,
);

export default rootEpic;