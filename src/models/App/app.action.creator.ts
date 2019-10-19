import { Modal } from 'src/libs/types';

// #region Actions
export const NUMBER_OF_PLAYERS_SELECTED_CHANGED = 'NUMBER_OF_PLAYERS_SELECTED_CHANGED';
export const ADD_MODAL = 'ADD_MODAL';
export const CLOSE_CURRENT_MODAL = 'CLOSE_CURRENT_MODAL';
export const MODALS_UPDATED_SUCCESSFULLY = 'MODALS_UPDATED_SUCCESSFULLY';
// #endregion Actions

// #region Action Creators
export const changeNumberOfPlayers = (numberOfPlayers: number) => ({
  type: NUMBER_OF_PLAYERS_SELECTED_CHANGED,
  payload: { numberOfPlayers },
})

export const addModal = (payload: Modal) => ({
  type: ADD_MODAL,
  payload,
})

export const closeCurrentModal = () => ({
  type: CLOSE_CURRENT_MODAL,
})

export const modalUpdatedSuccessfully = (payload: {modals: Modal[]}) => ({
  type: MODALS_UPDATED_SUCCESSFULLY,
  payload,
})
// #endregion Action Creators
