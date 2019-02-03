import { IndexState } from './indexView.reducer';
import { GameState } from './game.reducer';

export interface AppState {
  userInfo: {name: string, balance: number}
  indexView: IndexState,
  game: GameState
}

const initialState = {
  userInfo:{
    name: 'Sergio',
    balance: 1000.00
  },
  numberOfPlayersSelected: 2,
}

export default function (state: IndexState = initialState, action: any) {
  switch (action.type) {
    default: {
      return state;
    }
  };
};