// #region Actions
export const NUMBER_OF_PLAYERS_SELECTED_CHANGED = 'NUMBER_OF_PLAYERS_SELECTED_CHANGED';
// #endregion Actions

// #region Action Creators
export const changeNumberOfPlayers = (numberOfPlayers: number) => {
  return {
    type: NUMBER_OF_PLAYERS_SELECTED_CHANGED,
    payload: {numberOfPlayers},
  }
}
// #endregion Action Creators
