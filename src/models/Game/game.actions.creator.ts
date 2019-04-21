import { IPlayer, UICard } from 'src/types';

// #region Actions
export const START_GAME = 'START_GAME';
export const GAME_STARTED = 'GAME_STARTED';
export const DEAL_CARDS = 'DEAL_CARDS';
export const CARDS_DEALT = 'CARDS_DEALT';
export const CARD_CLICKED = 'CARD_CLICKED';
export const CARD_SELECTED = 'CARD_SELECTED';
export const CURRENT_PLAYER_CHANGED = 'CURRENT_PLAYER_CHANGED';
export const RAISE = 'RAISE';
export const RAISE_SUCCESSFUL = 'RAISE_SUCCESSFUL';
export const CHANGE_RAISE_AMOUNT = 'CHANGE_RAISE_AMOUNT';
export const CALL_SUCCESSFUL = 'CALL_SUCCESSFUL';
export const CALL_CHECK = 'CALL_CHECK';
export const PLACE_ANTE = 'PLACE_ANTE';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const REPLACE_CARDS = 'REPLACE_CARDS';
export const REPLACE_CARDS_SUCCESS = 'REPLACE_CARDS_SUCCESS';
export const ANTE_PLACED_SUCCESSFULLY = 'ANTE_PLACED_SUCCESSFULLY';
export const SHIFT_PLAYER_TURN = 'SHIFT_PLAYER_TURN';
export const SHIFT_PLAYER_TURN_SUCCESSFUL = 'SHIFT_PLAYER_TURN_SUCCESSFUL';
export const END_TURN = 'END_TURN';
export const TURN_ENDED = 'TURN_ENDED';

// #endregion Actions

// #region Action Creators
export const startNewGame = (payload: { numberOfPlayers: number, name: string, balance: number }) => {
  return {
    type: START_GAME,
    payload,
  }
}

export const onCardClick = (payload: {key: number}) => {
  return {
    type: CARD_CLICKED,
    payload,
  }
}

export const dealCards = () => {
  return {
    type: DEAL_CARDS,
  }
}

export const cardsDealt = (payload: {players: IPlayer[], deck: UICard[]}) => {
  return {
    type: CARDS_DEALT,
    payload,
  }
}

export const placeAnte = () => {
  return {
    type: PLACE_ANTE,
  }
}

export const raise = (payload: {amount: number, pid: number}) => {
  return {
    type: RAISE,
    payload,
  }
}

export const raiseSuccessful = (payload: {players: IPlayer[], pot: number }) => {
  return {
    type: RAISE_SUCCESSFUL,
    payload,
  }
}

export const callSuccessful = (payload: {players: IPlayer[], pot: number }) => {
  return {
    type: CALL_SUCCESSFUL,
    payload,
  }
}

export const playerTurnShiftSuccessFul = (payload: {currentPlayerId: number }) => {
  return {
    type: SHIFT_PLAYER_TURN_SUCCESSFUL,
    payload,
  }
}

export const currentPlayerChanged = (payload: {currentPlayerId: number }) => {
  return {
    type: CURRENT_PLAYER_CHANGED,
    payload,
  }
}

export const changeRaiseAmount = (amount: number) => {
  return {
    type: CHANGE_RAISE_AMOUNT,
    payload: { amount },
  }
}

export const checkCall = (pid: number) => {
  return {
    type: CALL_CHECK,
    payload: { pid }
  }
}

export const replaceCards = () => {
  return {
    type: REPLACE_CARDS,
  }
}

export const replaceCardsSuccess = (payload: any) => {
  return {
    type: REPLACE_CARDS_SUCCESS,
    payload,
  }
}

export const startGameSuccess = (payload: {players: IPlayer[]}) => {
  return {
    type: GAME_STARTED,
    payload,
  }
}

export const antePlacedSuccessfully = (payload: {players: IPlayer[], pot: number}) => {
  return {
    type: ANTE_PLACED_SUCCESSFULLY,
    payload,
  }
}

export const cardSelectedSuccessfully = (payload: {players: IPlayer[]}) => {
  return {
    type: CARD_SELECTED,
    payload,
  }
}

export const resetMessages = () => {
  return {
    type: RESET_MESSAGES,
  }
}

export const endTurn = () => {
  return {
    type: END_TURN,
  }
}

export const turnEnded = (payload: any) => { // TODO: Define payload
  return {
    type: TURN_ENDED,
    payload,
  }
}

export const shiftPlayerTurn = () => {
  return {
    type: SHIFT_PLAYER_TURN,
  }
}


 // #endregion Action Creators