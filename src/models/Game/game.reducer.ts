import {
  START_GAME,
  DEAL_CARDS,
  CARD_SELECTED,
  RAISE,
  CHANGE_RAISE_AMOUNT,
  PLACE_ANTE,
  CALL,
  CHECK,
  REPLACE_CARDS_SUCCESS
} from './game.actions.creator';

import _ from 'lodash';
import GameState from 'src/types/GameState.type';
import { IPlayer, UICard } from 'src/types';
import getNewDeck from 'src/libs/Deck/getNewDeck';


export default function (state: GameState = {}, action: any) {

  switch (action.type) {
    case START_GAME: {
      const dealerIndex: number = 1;
      const players = _.times(action.payload.numberOfPlayers)
        .map(i => new IPlayer(
          i === 0 ? action.payload.name : `Player_${i + 1}`,
          i === 0 ? action.payload.balance : 1000
        ))

      return {
        ...state,
        players,
        deck: getNewDeck(),
        status: GameStatus._NewGame,
        dealerIndex,
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
        const cardsForReplacement: number = state.players ? state.players[0].hand.filter((card: UICard) => card.selected).length : 0;
        let players = state.players ? [...state.players] : [];
        if (players.length) {
          const clickedCard: UICard = players[0].hand[action.payload.key]
          clickedCard.selected = clickedCard.selected || cardsForReplacement < 3 ?
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
      const status: number = state.status ? state.status + 1 : 0;
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
          status,
        }
      }
    }
    case CHECK: {
      //TODO: HAVE TO CHECK IF THE PLAYER IS DEALER (PLAYS LAST)
      const status: number = state.status ? state.status + 1 : 0;
      return {
        ...state,
        status
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
    // case REPLACE_CARDS: {
    //   let players: IPlayer[] = (state.players) ? [...state.players] : [];
    //   let newDeck: UICard[] = (state.deck) ? [...state.deck] : [];
    //   let newHand: UICard[] = players[0].hand.reduce(
    //     (newHand, card, index) => {
    //       if (card.selected) {
    //         return [...newHand.slice(0, index),
    //           newDeck.splice(0, 1)[0],
    //           ...newHand.slice(index + 1)];
    //       }
    //       return newHand;
    //     },
    //     players[0].hand);
    //   players[0] = {...players[0], hand:newHand}
    //   const status: number = state.status ? state.status + 1  : 0;
    //   return {
    //     ...state,
    //     players,
    //     deck: newDeck,
    //     status
    //   }
    // }
    case REPLACE_CARDS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  };

};

export enum GameStatus {
  _NewGame = 1,
  _FirstBetPhase = 2,
  _Discard = 3,
  _SecondBetPhase = 4,
  _EvaluationPhase = 5,
}
