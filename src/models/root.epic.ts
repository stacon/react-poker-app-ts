import { combineEpics } from 'redux-observable';
import gameEpic from './Game/game.epic';
import messagesEpic from './Messages/messages.epic'

const rootEpic = combineEpics(
 gameEpic,
 messagesEpic,
);

export default rootEpic;