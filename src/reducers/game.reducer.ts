export interface GameState {
  players?: []
}

export default function (state: GameState = {}, action: any) {

  switch (action.type) {
    case "START_GAME": {
      return {
        ...state,
        players: [...action.payload.players]
      }
    }
    default:
      return state;
  };

};