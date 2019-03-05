import { combineEpics } from 'redux-observable';
import gameEpic from './Game/game.epic';

const rootEpic = combineEpics(
 gameEpic,
);

export default rootEpic;