// #region Actions
export const SHOW_HAND_VALUE = 'SHOW_HAND_VALUE';
export const INITIALIZE_MESSAGES = 'INITIALIZE_MESSAGES';
// #endregion Actions

// #region Action Creators
export const initializeMessages = () => {
  return {
    type: INITIALIZE_MESSAGES
  }
}
// #endregion Action Creators