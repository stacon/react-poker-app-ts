import { NUMBER_OF_PLAYERS_SELECTED_CHANGED } from './app.action.creator'

export interface IndexState {
  numberOfPlayersSelected: number,
}

const initialState = {
  numberOfPlayersSelected: 2,
}

export default function (state: IndexState = initialState, action: any) {
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