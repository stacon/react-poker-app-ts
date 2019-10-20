import { NUMBER_OF_PLAYERS_SELECTED_CHANGED } from './app.action.creator'
import IndexState from 'src/libs/types/IndexState.type';

const initialState: IndexState = {
  numberOfPlayersSelected: 2,
}

export default function (state: IndexState = initialState, {type, payload}: any) {
  switch (type) {

    case (NUMBER_OF_PLAYERS_SELECTED_CHANGED): {
      return {
        ...state,
        numberOfPlayersSelected: payload.numberOfPlayers,
      }
    }
    default: {
      return state;
    }
  };
};
