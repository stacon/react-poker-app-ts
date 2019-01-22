//
import update from 'immutability-helper';

// interfaces
import { IPlayer } from 'src/helpers/interfaces';
import { Suit } from 'src/libs/references';

const players: IPlayer[] = [
  {
    index: 0,
    name: 'Player_1',
    hand: [
      {
        id: 1,
        suit: Suit.diamonds,
        rank: '10',
        isFlipped: true,
        playerId: 0
      },
      {
        id: 2,
        suit: Suit.hearts,
        rank: '10',
        isFlipped: true,
        playerId: 0
      },
      {
        id: 3,
        suit: Suit.spades,
        rank: 'Q',
        isFlipped: true,
        playerId: 0
      },
      {
        id: 4,
        suit: Suit.hearts,
        rank: '4',
        isFlipped: true,
        playerId: 0
      },
      {
        id: 5,
        suit: Suit.hearts,
        rank: 'K',
        isFlipped: true,
        playerId: 0
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
        rank: '5',
        isFlipped: true,
        playerId: 1
      },
      {
        id: 7,
        suit: Suit.hearts,
        rank: '4',
        isFlipped: true,
        playerId: 1
      },
      {
        id: 8,
        suit: Suit.diamonds,
        rank: '7',
        isFlipped: true,
        playerId: 1
      },
      {
        id: 9,
        suit: Suit.clubs,
        rank: '8',
        isFlipped: true,
        playerId: 1
      },
      {
        id: 10,
        suit: Suit.clubs,
        rank: '9',
        isFlipped: true,
        playerId: 1
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
        isFlipped: true,
        playerId: 2
      },
      {
        id: 12,
        suit: Suit.hearts,
        rank: '8',
        isFlipped: true,
        playerId: 2
      },
      {
        id: 13,
        suit: Suit.spades,
        rank: '4',
        isFlipped: true,
        playerId: 2
      },
      {
        id: 14,
        suit: Suit.diamonds,
        rank: '10',
        isFlipped: true,
        playerId: 2
      },
      {
        id: 15,
        suit: Suit.spades,
        rank: 'J',
        isFlipped: true,
        playerId: 2
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
        isFlipped: true,
        playerId: 3
      },
      {
        id:17,
        suit: Suit.hearts,
        rank: '10',
        isFlipped: true,
        playerId: 3
      },
      {
        id:18,
        suit: Suit.diamonds,
        rank: 'K',
        isFlipped: true,
        playerId: 3
      },
      {
        id: 19,
        suit: Suit.clubs,
        rank: 'Q',
        isFlipped: true,
        playerId: 1
      },
      {
        id: 20,
        suit: Suit.clubs,
        rank: 'A',
        isFlipped: true,
        playerId: 3
      }
    ]
  },
  // {
  //   index: 2,
  //   name: 'Player_3',
  //   hand: [
  //     {
  //       id: 5,
  //       suit: Suit.hearts,
  //       rank: '6',
  //       isFlipped: false,
  //       playerId: 2,
  //     },
  //     {
  //       id: 6,
  //       suit: Suit.spades,
  //       rank: '6',
  //       isFlipped: false,
  //       playerId: 2,
  //     }
  //   ]
  // },
  // {
  //   index: 3,
  //   name: 'Player_4',
  //   hand: [
  //     {
  //       id: 7,
  //       suit: Suit.diamonds,
  //       rank: '7',
  //       isFlipped: false,
  //       playerId: 3,
  //     },
  //     {
  //       id: 8,
  //       suit: Suit.clubs,
  //       rank: '8',
  //       isFlipped: false,
  //       playerId: 3,
  //     }
  //   ]
  // },
]

export default function (state: IPlayer[] = players, action: any): IPlayer[] {

  switch (action.type) {
    case "CARD_FLIPPED":

      const playerIndex = action.payload.playerId;
      const cardIndex = action.payload.cardIndex;

      return update(state, {
        [playerIndex]: {
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