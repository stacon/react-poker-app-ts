import {
  CARD_SELECTED,
  RAISE,
  CHANGE_RAISE_AMOUNT,
  CALL,
  CHECK,
  REPLACE_CARDS_SUCCESS,
  CARDS_DEALT,
  GAME_STARTED,
  ANTE_PLACED_SUCCESSFULLY
} from './game.actions.creator';

import _ from 'lodash';
import GameState from 'src/types/GameState.type';
import { IPlayer } from 'src/types';
import getNewDeck from 'src/libs/Deck/getNewDeck';
import { GameStatus } from 'src/enums';

const initialState: GameState = {
  players: [],
  deck: [],
  status: GameStatus._Uninitialized,
  dealerIndex: 0,
  amountForRaise: 0,
  pot: 0
}

export default function (state: GameState = initialState, action: any) {

  switch (action.type) {
    case CARDS_DEALT: {
      return {
        ...state,
        ...action.payload,
        status: GameStatus._FirstBetPhase
      }
    }

    case CARD_SELECTED: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case ANTE_PLACED_SUCCESSFULLY: {
      return {
        ...state,
        ...action.payload,
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

    case REPLACE_CARDS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case GAME_STARTED: {
      return {
        ...state,
        ...action.payload,
        deck: getNewDeck(),
        status: GameStatus._NewGame,
        dealerIndex: 1,
        amountForRaise: 0,
        pot: 0
      };
    }
    default: {
      return state;
    }
  };

};