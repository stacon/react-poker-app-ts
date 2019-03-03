import { START_GAME, DEAL_CARDS, CARD_SELECTED, RAISE, CHANGE_RAISE_AMOUNT, PLACE_ANTE, CALL, CHECK, REPLACE_CARDS } from './game.actions.creator';
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
      // const dealerIndex: number = Math.floor(Math.random() * action.payload.numberOfPlayers)
      const dealerIndex: number = 1;
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
      if (state.status === GameStatus._Discard) {
        const cardsForReplacement: number = state.players ? state.players[0].hand.filter(card => card.selected).length : 0;
        let players = state.players ? [...state.players] : [];
        if (players.length) {
          const clickedCard: UICard = players[0].hand[action.payload.key]
          clickedCard.selected = clickedCard.selected || cardsForReplacement  < 3 ?
              !clickedCard.selected : clickedCard.selected;
          return {
            ...state,
            players,
          }
        }
      }
      return {
        ...state
      }
    }
    case PLACE_ANTE: {
      let players: IPlayer[] = (state.players) ? [...state.players] : [];
      if (players) {
        const newBalance: number = players[0].balance - 10;
        players.map((player) => (player.balance = newBalance));
        let pot = (state.pot) ? state.pot : 0;
        pot = pot + 10 * players.length;
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
      let status: number = state.status ? state.status : 0;
      if (players.length) {
        const newBalance: number = players[0].balance - raiseAmount;
        let pot: number = 0;
        if (state.pot) {
          pot = state.pot + raiseAmount;
        }
        players[0].balance = newBalance
        return {
          ...state,
          players,
          pot,
          status: status + 1
        }
      }
    }

    case CHECK: {
      //TODO: HAVE TO CHECK IF THE PLAYER IS DEALER (PLAYS LAST)
      let status: number = state.status ? state.status : 0;
      return {
        ...state,
        status: status + 1
      }
    }

    case CALL: {
      const players: IPlayer[] = (state.players) ? [...state.players] : [];
      const raiseAmount: number = action.payload.amount ? action.payload.amount : 0;
      let pot: number = 0;
      if (players.length) {
        players.map((player, index) => {
          //TODO: NEEDS REFACTORING BECAUSE IN REAL GAME ALL PLAYERS CAN BET
          if (index !== 0)
            player.balance = player.balance - raiseAmount
        })
        if (state.pot) {
          pot = state.pot + raiseAmount;
        }
      }
      return {
        ...state,
        players,
        pot
      }
    }
    case REPLACE_CARDS: {
      let players: IPlayer[] = (state.players) ? [...state.players] : [];
      let newDeck: UICard[] = (state.deck) ? [...state.deck] : [];
      let newHand: UICard[] = players[0].hand.reduce(
        (newHand, card, index) => {
          if (card.selected) {
            return [...newHand.slice(0, index),
              newDeck.splice(0, 1)[0],
              ...newHand.slice(index + 1)];
          }
          return newHand;
        },
        players[0].hand);
      players[0] = {...players[0], hand:newHand}
      let status: number = state.status ? state.status : 0;
      return {
        ...state,
        players: players,
        deck: newDeck,
        status: status+1
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
  _Discard = 3,
  _SecondBetPhase = 4,
  _EvaluationPhase = 5,
}

export enum ActionType {
  _Fold = 1,
  _Check = 2,
  _Call = 3,
  _Raise = 4,
  _ReplaceCards = 5,
}