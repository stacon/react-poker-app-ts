//
import update from 'immutability-helper';

// interfaces
import { IPlayer } from 'src/helpers/interfaces';
import { Suit } from 'src/libs/references';

const players = [
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
]

export default function ( state: IPlayer[] = players, action: any ):IPlayer[] {

  switch(action.type) {
    case "CARD_FLIPPED":

      const playerIndex = action.payload.playerId;
      const cardIndex = action.payload.cardIndex;

      return update(state, {
        [playerIndex] : {
          hand: {
            [cardIndex]: {
              isFlipped: { $set: action.payload.isFlipped }
             }
           }
        }
      });

    default:
      return state;
  };

};