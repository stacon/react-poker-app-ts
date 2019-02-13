import { START_GAME, DEAL_CARDS, CARD_SELECTED, RAISE, CHANGE_RAISE_AMOUNT, PLACE_ANTE } from './game.actions.creator';
import { getNewDeck } from 'src/libs/models';
import _ from 'lodash';
import { UICard } from 'src/components/Views/Game/Card/Card';

export interface GameState {
  players?: IPlayer[],
  deck?: UICard[],
  status?: number,
  dealerIndex?: number,
  amountForRaise?: number,
  pot?: number
}

export default function (state: GameState = {}, action: any) {

  switch (action.type) {
    case START_GAME: {
      const dealerIndex: number = Math.floor(Math.random() * action.payload.numberOfPlayers)
      const players = _.times(action.payload.numberOfPlayers).map(
        (i) => {
          if (i === 0) {
            return new IPlayer(action.payload.name, action.payload.balance);
          }
          return new IPlayer(`Player_${i + 1}`, 1000);
        });
      
      return {
        ...state,
        players: players,
        deck: getNewDeck(),
        status: GameStatus._NewGame,
        dealerIndex: dealerIndex,
        amountForRaise: 0,
        pot: 0
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
        status: GameStatus._FirstBetPhase
      }
    }
    case CARD_SELECTED: {
      let players = (state.players) ? [...state.players] : [];
      if (players.length) {
        players[0].hand[action.payload.key].selected = !players[0].hand[action.payload.key].selected;
        return {
          ...state,
          players,
        }
      }
    }
    case PLACE_ANTE: {
      let players: IPlayer[] = (state.players) ? [...state.players] : [];
      if (players) {
        const newBalance: number = players[0].balance - 10;
        players.map((player) => (player.balance = newBalance));
        let pot = (state.pot)? state.pot : 0;
        pot = pot + 10*players.length;
        return {
          ...state,
          players,
          pot
        }
      }
      console.log('PLAYERS NOT FOUND!');
      return {
        ...state
      }
    }
    case CHANGE_RAISE_AMOUNT: {
      return {
        ...state,
        amountForRaise: action.payload.amount,
      }
    }
    case RAISE: {
      const players: IPlayer[] = (state.players) ? [...state.players] : [];
      const raiseAmount: number = state.amountForRaise ? state.amountForRaise : 0;
      if (players.length) {
        const newBalance: number = players[0].balance - raiseAmount;
        let pot: number = 0;
        if(state.pot) {
          pot = state.pot + raiseAmount;
        }
        players[0].balance = newBalance
        return {
          ...state,
          players,
          pot
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
  _NewGame = 1,
  _FirstBetPhase = 2,
  _DiscardAndSecondBetPhase = 3,
  _EvaluationPhase = 4,
}

export enum ActionType {
  _Fold = 1,
  _Check = 2,
  _Call = 3,
  _Raise = 4,
  _ReplaceCards = 5,
}