// #region Actions
export const START_GAME = 'START_GAME';
export const DEAL_CARDS = 'DEAL_CARDS';
export const CARD_SELECTED = 'CARD_SELECTED';

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
    type: DEAL_CARDS,
  }
}
// #endregion Action Creators
