// #region Actions
export const START_GAME = 'START_GAME';
export const DEAL_CARDS = 'DEAL_CARDS';
export const CARD_SELECTED = 'CARD_SELECTED';
export const RAISE = 'RAISE';
export const CHANGE_RAISE_AMOUNT = 'CHANGE_RAISE_AMOUNT';

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

export const raise = () => {
  return {
    type: RAISE
  }
}

export const changeRaiseAmount = (amount: number) => {
  return {
    type:CHANGE_RAISE_AMOUNT,
    payload: {amount}
  }
}
// #endregion Action Creators