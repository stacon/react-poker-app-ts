import { createStore, applyMiddleware, compose } from 'redux';
import {
 createEpicMiddleware,
} from 'redux-observable';


import rootReducer from 'src/models/root.reducer';
import rootEpic from 'src/models/root.epic';

import { UserState } from 'src/models/User/user.reducer';
import { IndexState } from 'src/models/App/app.reducer';
import { GameState } from 'src/models/Game/game.reducer';
import { MessagesState } from 'src/models/Messages/messages.reducer';

export interface AppState {
 user: UserState,
 app: IndexState,
 game: GameState,
 messages: MessagesState
}

const enhancers = [];

const { __REDUX_DEVTOOLS_EXTENSION__: devToolsExtension } = (global as any);
const epicMiddleware = createEpicMiddleware();
const middleware = [epicMiddleware];

if (devToolsExtension && typeof devToolsExtension === 'function') {
 enhancers.push(devToolsExtension());
}

const store = createStore(
 rootReducer,
 {},
 compose(
   applyMiddleware(...middleware),
   ...enhancers,
 ),
);

epicMiddleware.run(rootEpic);

// const pingEpic = (action$: any) => action$.pipe(
//   ofType('‘'PING’),
//   delay(1000), // Asynchronously wait 1000ms then continue
//   mapTo({ type: '‘'PONG’ })
// );
//
// epicMiddleware.run(pingEpic);


export default store;