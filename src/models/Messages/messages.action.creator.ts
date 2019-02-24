// #region Actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const INITIALIZE_MESSAGES = 'INITIALIZE_MESSAGES';

// #endregion Actions

// #region Action Creators
export const initializeMessages = () => {
  return {
    type: INITIALIZE_MESSAGES
  }
}

export const addMessage = (message: string) => {
  return { 
    type: ADD_MESSAGE,
    payload: {message}
  }
}
// #endregion Action Creators