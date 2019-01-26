import { Suit } from "src/libs/references";
import { IPlayer } from 'src/helpers/interfaces';

const players: IPlayer[] = [
  {
    index: 0,
    name: 'Player_1',
    hand: [
      {
        id: 1,
        suit: Suit.diamonds,
        rank: '10',
        isFlipped: true
      },
      {
        id: 2,
        suit: Suit.hearts,
        rank: '10',
        isFlipped: true
      },
      {
        id: 3,
        suit: Suit.spades,
        rank: 'Q',
        isFlipped: true
      },
      {
        id: 4,
        suit: Suit.hearts,
        rank: '4',
        isFlipped: true
      },
      {
        id: 5,
        suit: Suit.hearts,
        rank: 'K',
        isFlipped: true
      }
    ]
  },
  {
    index: 1,
    name: 'Player_2',
    hand: [
      {
        id: 6,
        suit: Suit.spades,
        rank: 'J',
        isFlipped: true
      },
      {
        id: 7,
        suit: Suit.hearts,
        rank: 'J',
        isFlipped: true
      },
      {
        id: 8,
        suit: Suit.diamonds,
        rank: '7',
        isFlipped: true
      },
      {
        id: 9,
        suit: Suit.clubs,
        rank: '8',
        isFlipped: true
      },
      {
        id: 10,
        suit: Suit.clubs,
        rank: '9',
        isFlipped: true
      }
    ]
  },
  {
    index: 2,
    name: 'Player_3',
    hand: [
      {
        id: 11,
        suit: Suit.diamonds,
        rank: '7',
        isFlipped: true
      },
      {
        id: 12,
        suit: Suit.hearts,
        rank: '8',
        isFlipped: true
      },
      {
        id: 13,
        suit: Suit.spades,
        rank: '4',
        isFlipped: true
      },
      {
        id: 14,
        suit: Suit.diamonds,
        rank: '10',
        isFlipped: true
      },
      {
        id: 15,
        suit: Suit.spades,
        rank: 'J',
        isFlipped: true
      }
    ]
  },
  {
    index: 3,
    name: 'Player_4',
    hand: [
      {
        id:16,
        suit: Suit.spades,
        rank: '10',
        isFlipped: true
      },
      {
        id:17,
        suit: Suit.hearts,
        rank: '10',
        isFlipped: true
      },
      {
        id:18,
        suit: Suit.diamonds,
        rank: 'K',
        isFlipped: true
      },
      {
        id: 19,
        suit: Suit.clubs,
        rank: 'Q',
        isFlipped: true
      },
      {
        id: 20,
        suit: Suit.clubs,
        rank: 'A',
        isFlipped: true
      }
    ]
  }
]

export default function (state: IPlayer[] = players, action: any): IPlayer[] {

  switch (action.type) {
    case "JOIN_GAME":
    case "ADD_PLAYER":

    // case "CARD_FLIPPED":

    //   const playerIndex = action.payload.playerId;


    //   return update(state, {
    //     [playerIndex]: {
    //       hand: {
    //         [cardIndex]: {
    //           isFlipped: { $set: action.payload.isFlipped }
    //         }
    //       }
    //     }
    //   });

    default:
      return state;
  };

};