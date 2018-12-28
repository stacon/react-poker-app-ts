import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { IState } from '../helpers/interfaces';
import { Suit } from '../libs/references';

const initialState: IState = {
    hand: [
      {
        id: 1,
        suit: Suit.spades,
        rank: '1',
        isFlipped: false
      },
      {
        id: 2,
        suit: Suit.hearts,
        rank: 'A',
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