import { NUMBER_OF_PLAYERS_SELECTED_CHANGED, MODALS_UPDATED_SUCCESSFULLY } from './app.action.creator'
import IndexState from 'src/libs/types/IndexState.type';

const initialState = {
  numberOfPlayersSelected: 2,
  modals: []
}

export default function (state: IndexState = initialState, action: any) {
  switch (action.type) {

    case (NUMBER_OF_PLAYERS_SELECTED_CHANGED): {
      return {
        ...state,
        numberOfPlayersSelected: action.payload.numberOfPlayers,
      }
    }
    case (MODALS_UPDATED_SUCCESSFULLY): {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  };
};