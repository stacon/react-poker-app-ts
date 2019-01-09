import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { IState } from '../helpers/interfaces';
import { Suit } from '../libs/references';

const initialState: IState = {
    players: [
      {
        index: 0,
        name: 'Player_1',
        hand: [
          {
            id: 1,
            suit: Suit.spades,
            rank: '1',
            isFlipped: false,
            playerId: 0,
          },
          {
            id: 2,
            suit: Suit.hearts,
            rank: 'A',
            isFlipped: false,
            playerId: 0,
          }
        ]
      },
      {
        index: 1,
        name: 'Player_2',
        hand: [
          {
            id: 3,
            suit: Suit.spades,
            rank: '5',
            isFlipped: false,
            playerId: 1,
          },
          {
            id: 4,
            suit: Suit.hearts,
            rank: 'K',
            isFlipped: false,
            playerId: 1,
          }
        ]
      },
      {
        index: 2,
        name: 'Player_3',
        hand: [
          {
            id: 5,
            suit: Suit.hearts,
            rank: '6',
            isFlipped: false,
            playerId: 2,
          },
          {
            id: 6,
            suit: Suit.spades,
            rank: '6',
            isFlipped: false,
            playerId: 3,
          }
        ]
      },
      {
        index: 2,
        name: 'Player_3',
        hand: [
          {
            id: 5,
            suit: Suit.hearts,
            rank: '6',
            isFlipped: false,
            playerId: 2,
          },
          {
            id: 6,
            suit: Suit.spades,
            rank: '6',
            isFlipped: false,
            playerId: 3,
          }
        ]
      },
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