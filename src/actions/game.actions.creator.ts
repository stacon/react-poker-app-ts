// #region Actions
export const START_GAME = 'START_GAME';
export const DEAL_CARDS = 'DEAL_CARDS';
// #endregion Actions

// #region Action Creators
export const startNewGame = ({numberOfPlayers,name,balance}:any) => {
  return {
    type: START_GAME,
    payload: {numberOfPlayers,name,balance}
  }
}

export const dealCards = () => {
  return {
    type: DEAL_CARDS,
  }
}
// #endregion Action Creators
