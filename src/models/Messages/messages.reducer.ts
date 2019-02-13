import { DEAL_CARDS, RAISE, RESET_MESSAGES, PLACE_ANTE } from '../Game/game.actions.creator';
import { ADD_MESSAGE } from './messages.action.creator';

export interface MessagesState {
  list?: string[]
}

export default function (state: MessagesState = {list: []}, action: any) {
  switch (action.type) {
    case (DEAL_CARDS): {
      const list=  (state.list) ? [...state.list, 'HANDS DEALT! GOOD LUCK'] : [];      
      return {
        ...state,
        list
      }
    }
    case (RAISE): {
      const list=  (state.list) ? [...state.list, `SERGIO RAISED TO ${action.payload.amount} $`] : []; 
      return {
        ...state,
        list
      } 
    }
    case (ADD_MESSAGE): {
      const list=  (state.list) ? [...state.list, action.payload.message] : [];      
      return {
        ...state,
        list
      }
    }
    case (RESET_MESSAGES): {
      const list: string[] = [];
      return {
        ...state,
        list: list
      }
    }
    case (PLACE_ANTE): {
      const list=  (state.list) ? [...state.list, 'PLAYERS PLACED THEIR ANTES'] : [];
      return {
        ...state,
        list
      }
    }
    default: {
      return state;
    }
  };
};