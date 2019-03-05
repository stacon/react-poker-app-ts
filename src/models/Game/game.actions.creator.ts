// #region Actions
export const START_GAME = 'START_GAME';
export const DEAL_CARDS = 'DEAL_CARDS';
export const CARD_SELECTED = 'CARD_SELECTED';
export const RAISE = 'RAISE';
export const CHANGE_RAISE_AMOUNT = 'CHANGE_RAISE_AMOUNT';
export const CALL = 'CALL';
export const CHECK = 'CHECK';
export const PLACE_ANTE = 'PLACE_ANTE';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const REPLACE_CARDS = 'REPLACE_CARDS';
export const REPLACE_CARDS_SUCCESS = 'REPLACE_CARDS_SUCCESS';

// #endregion Actions

// #region Action Creators
export const startNewGame = ({numberOfPlayers,name,balance}:any) => {
 return {
   type: START_GAME,
   payload: {numberOfPlayers,name,balance}
 }
}

export const onCardSelect = (key: number) => {
 return {
   type: CARD_SELECTED,
   payload: {key}
 }
}

export const dealCards = () => {
 return {
   type: DEAL_CARDS
 }
}

export const placeAnte = () => {
 return {
   type: PLACE_ANTE
 }
}

export const raise = (amount: number ) => {
 return {
   type: RAISE,
   payload: {amount}
 }
}

export const changeRaiseAmount = (amount: number) => {
 return {
   type:CHANGE_RAISE_AMOUNT,
   payload: {amount}
 }
}

export const call = (amount: number) => {
 return {
   type:CALL,
   payload: {amount}
 }
}

export const check = () => {
 return {
   type:CHECK
 }
}

export const replaceCards = () => {
 return {
   type:REPLACE_CARDS
 }
}

export const replaceCardsSuccess = (payload: any) => {
  return {
    type:REPLACE_CARDS_SUCCESS,
    payload,
  }
 }

 export const resetMessages = () => {
  return {
    type:RESET_MESSAGES
  }
 }


 // #endregion Action Creators