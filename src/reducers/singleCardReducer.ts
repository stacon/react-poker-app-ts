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
        suit: Suit.hearts,
        rank: 'A',
        isFlipped: true,
        playerId: 0,
        value: 0,
        name: ''
      },
      {
        id: 2,
        suit: Suit.hearts,
        rank: '2',
        isFlipped: true,
        playerId: 0,
        value: 0,
        name: ''
      },
      {
        id: 3,
        suit: Suit.hearts,
        rank: '10',
        isFlipped: true,
        playerId: 0,
        value: 0,
        name: ''
      },
      {
        id: 4,
        suit: Suit.hearts,
        rank: 'K',
        isFlipped: true,
        playerId: 0,
        value: 0,
        name: ''
      },
      {
        id: 5,
        suit: Suit.hearts,
        rank: '8',
        isFlipped: true,
        playerId: 0,
        value: 0,
        name: ''
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
        playerId: 1,
        value: 0,
        name: ''
      },
      {
        id: 7,
        suit: Suit.hearts,
        rank: '6',
        isFlipped: true,
        playerId: 1,
        value: 0,
        name: ''
      },
      {
        id: 8,
        suit: Suit.diamonds,
        rank: '7',
        isFlipped: true,
        playerId: 1,
        value: 0,
        name: ''
      },
      {
        id: 9,
        suit: Suit.clubs,
        rank: '8',
        isFlipped: true,
        playerId: 1,
        value: 0,
        name: ''
      },
      {
        id: 10,
        suit: Suit.clubs,
        rank: '9',
        isFlipped: true,
        playerId: 1,
        value: 0,
        name: ''
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