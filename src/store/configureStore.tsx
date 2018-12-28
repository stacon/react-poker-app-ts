import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { IState } from 'src/helpers/interfaces';

export const initialState: IState = {
      hand: [
        {
          id: 1,
          suit: 'spades',
          rank: 'rank1',
          isFlipped: false
        }
      ]

};

const store = createStore(
  rootReducer,
  initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);

console.clear();
console.info({ initialState: store.getState() });

export default store;