import { DEAL_CARDS, RAISE } from '../Game/game.actions.creator';
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
    default: {
      return state;
    }
  };
};