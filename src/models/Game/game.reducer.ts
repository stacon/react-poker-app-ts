import {
  CARD_SELECTED,
  CHANGE_RAISE_AMOUNT,
  REPLACE_CARDS_SUCCESS,
  CARDS_DEALT,
  ANTE_PLACED_SUCCESSFULLY,
  RAISE_SUCCESSFUL,
  SHIFT_PLAYER_TURN_SUCCESSFUL,
  CALL_CHECK_SUCCESSFUL,
  CHANGE_STATUS,
  EVALUATION_COMPLETED_SUCCESSFULLY,
  START_NEXT_ROUND,
  PLAYER_FOLDING_COMPLETED,
  GAME_STARTED_SUCCESSFULLY
} from './game.actions.creator';

import _ from 'lodash';
import GameState from 'src/libs/types/GameState.type';
import getNewDeck from 'src/libs/Deck/getNewDeck';
import { GameStatus } from 'src/enums';

const initialState: GameState = {
  players: [],
  deck: [],
  currentPlayerPID: '',
  dealerPID: '0',
  amountForRaise: 1,
  pot: 0,
  phase: {
    statusId: GameStatus._Uninitialized,
    playerPIDsTookAction: [],
    playersPIDsInGamePhase: []
  }
}

export default function (state: GameState = initialState, action: any): GameState {

  switch (action.type) {
    case CARDS_DEALT: {
      return {
        ...state,
        ...action.payload,
        phase: {
          ...state.phase,
          playersPIDsInGamePhase: [...state.players.map(player => player.pid)],
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
          playerPIDsTookAction: [],
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
        amountForRaise: 1,
        ...action.payload,
      }
    }

    case START_NEXT_ROUND: {
      const oldState = {...state};
      oldState.players.forEach(player => player.hand = [])
      return {
        ...state,
        deck: getNewDeck(),
        phase: {
          playerPIDsTookAction: [],
          playersPIDsInGamePhase: [],
          statusId: GameStatus._NewGame,
        },
        currentPlayerPID: '0',
        dealerPID: '0',
        amountForRaise: 1,
        pot: 0
      }
    }

    case PLAYER_FOLDING_COMPLETED: {
      return {
        ...state,
        players: [...action.payload.players],
        phase: {
          ...action.payload.phase,
          playersPIDsInGamePhase: [...action.payload.activePlayersPIDs]
        }
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
        ...action.payload,
      };
    }

    case EVALUATION_COMPLETED_SUCCESSFULLY: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case GAME_STARTED_SUCCESSFULLY: {
      return {
        ...state,
        ...action.payload,
        amountForRaise: 1,
      };
    }
    default: {
      return state;
    }
  };

};