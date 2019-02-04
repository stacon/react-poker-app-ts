// #region Actions
export const START_GAME = 'START_GAME';
// #endregion Actions

// #region Action Creators
export const startNewGame = (numberOfPlayers: number) => {
  return {
    type: START_GAME,
    payload: numberOfPlayers,
  }
}
// #endregion Action Creators
