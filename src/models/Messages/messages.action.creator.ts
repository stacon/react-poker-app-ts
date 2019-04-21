// #region Actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const INITIALIZE_MESSAGES = 'INITIALIZE_MESSAGES';
export const MESSAGE_ADDED_SUCCESSFULLY = 'MESSAGE_ADDED_SUCCESSFULLY';

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

export const messageAddedSuccessfully = (payload: {list: string[]}) => {
  return {
    type: MESSAGE_ADDED_SUCCESSFULLY,
    payload,
  }
}

// #endregion Action Creators