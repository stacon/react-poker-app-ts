import {
  CARD_SELECTED,
  CHANGE_RAISE_AMOUNT,
  REPLACE_CARDS_SUCCESS,
  CARDS_DEALT,
  GAME_STARTED,
  ANTE_PLACED_SUCCESSFULLY,
  RAISE_SUCCESSFUL,
  SHIFT_PLAYER_TURN_SUCCESSFUL,
  CALL_CHECK_SUCCESSFUL,
  CHANGE_STATUS
} from './game.actions.creator';

import _ from 'lodash';
import GameState from 'src/types/GameState.type';
import getNewDeck from 'src/libs/Deck/getNewDeck';
import { GameStatus } from 'src/enums';

const initialState: GameState = {
  players: [],
  deck: [],
  currentPlayerId: -1,
  dealerIndex: 0,
  amountForRaise: 1,
  pot: 0,
  phase: {
    statusId: GameStatus._Uninitialized,
    playerIDsTookAction: [],
    playersIDsInGamePhase: []
  }
}

export default function (state: GameState = initialState, action: any) {

  switch (action.type) {
    case CARDS_DEALT: {
      return {
        ...state,
        ...action.payload,
        phase: {
          ...state.phase,
          playersIDsInGamePhase: _.times(action.payload.players.length, Number),
          statusId: GameStatus._FirstBetPhase
        }
      }
    }

    case CARD_SELECTED: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case CALL_CHECK_SUCCESSFUL: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case CHANGE_STATUS: {
      return {
        ...state,
        phase: {
          ...state.phase,
          ...action.payload,
        }
      }
    }

    case ANTE_PLACED_SUCCESSFULLY: {
      return {
        ...state,
      }

    }

    case CHANGE_RAISE_AMOUNT: {
      return {
        ...state,
        amountForRaise: action.payload.amount,
      }
    }

    case RAISE_SUCCESSFUL: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case SHIFT_PLAYER_TURN_SUCCESSFUL: {
      return {
        ...state,
        ...action.payload
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
        phase: {
          ...state.phase,
          statusId: GameStatus._NewGame,
        },
        currentPlayerId: 0,
        dealerIndex: 1,
        amountForRaise: 1,
        pot: 0
      };
    }
    default: {
      return state;
    }
  };

};