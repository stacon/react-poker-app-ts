//
import update from 'immutability-helper';

// interfaces
import { IPlayer } from 'src/helpers/interfaces';

export default function ( state: IPlayer[] = [], action: any ):IPlayer[] {

  switch(action.type) {
    case "CARD_FLIPPED":

      const playerIndex = action.payload.playerId;
      const cardIndex = action.payload.cardIndex;

      return update(state, {
        [playerIndex] : {
          hand: {
            [cardIndex]: {
              isFlipped: { $set: action.payload.cardId }
             }
           }
        }
      });

    default:
      return state;
  };

};