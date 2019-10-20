import { Action } from 'redux';
import { Dialog } from 'src/libs/types';

// #region Actions
export const TO_SERVER = 'TO_SERVER';
export const ADD_DIALOG = 'ADD_DIALOG';
export const CLOSE_CURRENT_DIALOG = 'CLOSE_CURRENT_DIALOG';
export const DIALOGS_UPDATED_SUCCESSFULLY = 'DIALOGS_UPDATED_SUCCESSFULLY';

// #endregion Actions

export const emitToServer = (payload: { action: Action }) => ({
  type: TO_SERVER,
  payload
});

export const addModal = (payload: Dialog) => ({
  type: ADD_DIALOG,
  payload,
});

export const closeCurrentModal = () => ({
  type: CLOSE_CURRENT_DIALOG,
});

export const modalUpdatedSuccessfully = (payload: {dialogs: Dialog[]}) => ({
  type: DIALOGS_UPDATED_SUCCESSFULLY,
  payload,
});