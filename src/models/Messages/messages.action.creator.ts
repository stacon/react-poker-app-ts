// #region Actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const MESSAGE_ADDED_SUCCESSFULLY = 'MESSAGE_ADDED_SUCCESSFULLY';
export const RESET_MESSAGES = 'RESET_MESSAGES';


// #endregion Actions

// #region Action Creators
export const addMessage = (message: string) => {
  return {
    type: ADD_MESSAGE,
    payload: {message}
  }
}

export const resetMessages = () => ({
  type: RESET_MESSAGES,
  payload: null,
})

export const messageAddedSuccessfully = (payload: {list: string[]}) => {
  return {
    type: MESSAGE_ADDED_SUCCESSFULLY,
    payload,
  }
}

// #endregion Action Creators