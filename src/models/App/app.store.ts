import { createStore } from "redux";
import rootReducer from "../root.reducer";
import { UserState } from 'src/models/User/user.reducer';
import { IndexState } from 'src/models/App/app.reducer';
import { GameState } from 'src/models/Game/game.reducer';

export interface AppState {
  user: UserState,
  app: IndexState,
  game: GameState
}

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);

export default store;