import { createStore } from "redux";
import rootReducer from "./root.reducer";
import { UserState } from 'src/reducers/user.reducer';
import { IndexState } from 'src/reducers/HomeView.reducer';
import { GameState } from 'src/reducers/GameView.reducer';

export interface AppState {
  user: UserState,
  homeView: IndexState,
  gameView: GameState
}

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);

export default store;