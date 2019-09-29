import { Action } from 'redux';

// #region Actions
export const TO_SERVER = 'TO_SERVER';

// #endregion Actions

export const emitToServer = (payload: { action: Action }) => ({
  type: TO_SERVER,
  payload
})