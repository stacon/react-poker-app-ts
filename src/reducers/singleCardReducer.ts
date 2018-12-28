//
//import update from 'immutability-helper';

// interfaces
import { ICard } from 'src/helpers/interfaces';

export default function ( state: ICard[] = [], action: any ):ICard[] {

  switch(action.type) {
    case "CARD_FLIPPED":

      const card = state.find( item => item.id === action.payload.id );
      card ? card.isFlipped = action.payload.isFlipped : card;

      console.log('>>>> card', card)
      console.log('>>>> state', state)

      return {
        ...state
      };
    default:
      return state;
  };

};