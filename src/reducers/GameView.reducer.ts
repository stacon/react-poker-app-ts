import { START_GAME, DEAL_CARDS, CARD_SELECTED } from '../actions/game.actions.creator';
import { getNewDeck } from 'src/libs/models';
import _ from 'lodash';
import { UICard } from 'src/components/Views/Game/Card/Card';

export interface GameState {
  players?: IPlayer[],
  deck?: UICard[],
  status?: number,
}

export default function (state: GameState = {}, action: any) {

  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        players: _.times(action.payload.numberOfPlayers).map((i) => {
          return (i === 0) ?
            new IPlayer(action.payload.name, action.payload.balance) :
            new IPlayer(`Player_${i + 1}`, 1000)
        }),
        deck: getNewDeck(),
        status: GameStatus._New
      }
      break;
    }
    case DEAL_CARDS: {
      let newDeck: UICard[] = (state.deck) ? [...state.deck] : [];
      let newPlayers: IPlayer[] = (state.players) ?
        state.players.map(player => ({
          ...player,
          hand: newDeck.splice(0, 5)
        }
        )) : []
      return {
        ...state,
        players: newPlayers,
        deck: newDeck,
        status: GameStatus._FirstPhase
      }
    }
    case CARD_SELECTED: {
      let players = (state.players) ? [...state.players] : [];
      if (players.length) {
        players[0].hand[action.payload.key].selected = !players[0].hand[action.payload.key].selected;
        console.log(players);
        return {
          ...state,
          players,
        }
      }
    }
    default: {
      return state;
    }
  };

};

export class IPlayer {
  public hand: UICard[];
  constructor(
    public name: string,
    public balance: number
  ) {
    this.hand = [];
  }
}

export enum GameStatus {
  _New = 1,
  _FirstPhase = 2,
}