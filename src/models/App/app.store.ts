import { createStore, applyMiddleware, compose } from 'redux';
import {
  createEpicMiddleware,
} from 'redux-observable';


import rootReducer from 'src/models/root.reducer';
import rootEpic from 'src/models/root.epic';
import { UserState, IndexState, GameState, MessagesState } from 'src/libs/types';
import socketMiddleWare from '../App/socketIO.middleware';


export interface AppState {
  user: UserState,
  app: IndexState,
  game: GameState,
  messages: MessagesState
}

const enhancers = [];

const { __REDUX_DEVTOOLS_EXTENSION__: devToolsExtension } = (global as any);
const epicMiddleware = createEpicMiddleware();
const middlewares = [
  epicMiddleware,
  socketMiddleWare,
];

if (devToolsExtension && typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middlewares),
    ...enhancers,
  ),
);

epicMiddleware.run(rootEpic);


export default store;