import { NUMBER_OF_PLAYERS_SELECTED_CHANGED } from './app.action.creator'

export interface AppState {
  numberOfPlayersSelected: number,
}

const initialState = {
  numberOfPlayersSelected: 2,
}

export default function (state: AppState = initialState, action: any) {
  switch (action.type) {
    case (NUMBER_OF_PLAYERS_SELECTED_CHANGED): {
      return {
        ...state,
        numberOfPlayersSelected: action.payload.numberOfPlayers,
      }
    }
    default: {
      return state;
    }
  };
};