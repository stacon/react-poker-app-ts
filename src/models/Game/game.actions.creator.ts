import { IPlayer, UICard } from 'src/types';

// #region Actions
export const START_GAME = 'START_GAME';
export const GAME_STARTED = 'GAME_STARTED';
export const DEAL_CARDS = 'DEAL_CARDS';
export const CARDS_DEALT = 'CARDS_DEALT';
export const CARD_CLICKED = 'CARD_CLICKED';
export const CARD_SELECTED = 'CARD_SELECTED';
export const RAISE = 'RAISE';
export const CHANGE_RAISE_AMOUNT = 'CHANGE_RAISE_AMOUNT';
export const CALL = 'CALL';
export const CHECK = 'CHECK';
export const PLACE_ANTE = 'PLACE_ANTE';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const REPLACE_CARDS = 'REPLACE_CARDS';
export const REPLACE_CARDS_SUCCESS = 'REPLACE_CARDS_SUCCESS';
export const ANTE_PLACED_SUCCESSFULLY = 'ANTE_PLACED_SUCCESSFULLY';

// #endregion Actions

// #region Action Creators
export const startNewGame = (payload: { numberOfPlayers: number, name: string, balance: number }) => {
  return {
    type: START_GAME,
    payload
  }
}

export const onCardClick = (key: number) => {
  return {
    type: CARD_CLICKED,
    payload: { key }
  }
}

export const dealCards = () => {
  return {
    type: DEAL_CARDS
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
    type: PLACE_ANTE
  }
}

export const raise = (amount: number) => {
  return {
    type: RAISE,
    payload: { amount }
  }
}

export const changeRaiseAmount = (amount: number) => {
  return {
    type: CHANGE_RAISE_AMOUNT,
    payload: { amount }
  }
}

export const call = (amount: number) => {
  return {
    type: CALL,
    payload: { amount }
  }
}

export const check = () => {
  return {
    type: CHECK
  }
}

export const replaceCards = () => {
  return {
    type: REPLACE_CARDS
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
    payload
  }
}

export const antePlacedSuccessfully = (payload: {players: IPlayer[], pot: number}) => {
  return {
    type: ANTE_PLACED_SUCCESSFULLY,
    payload
  }
}

export const cardSelectedSuccessfully = (payload: {players: IPlayer[]}) => {
  return {
    type: CARD_SELECTED,
    payload
  }
}

export const resetMessages = () => {
  return {
    type: RESET_MESSAGES
  }
}


 // #endregion Action Creators