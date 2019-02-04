import { START_GAME } from '../actions/game.actions.creator';

export interface GameState {
  players?: [],
  deck?: {}
}

export default function (state: GameState = {}, action: any) {

  switch (action.type) {
    case START_GAME: {
      console.log(`Requested new game with ${action.payload} players`)
      return {
        ...state,
        players: [...action.payload]
      }
    }
    default:
      return state;
  };

};