import { RAISE, RESET_MESSAGES } from '../Game/game.actions.creator';
import { MESSAGE_ADDED_SUCCESSFULLY } from './messages.action.creator';
import MessagesState from 'src/types/MessagesState.type';

export default function (state: MessagesState = {list: []}, action: any) {
  switch (action.type) {
    case (RAISE): {
      const list=  (state.list) ?
       [
         ...state.list,
         `SERGIO RAISED TO ${action.payload.amount} $`,
       ] : [];
      return {
        ...state,
        list
      }

    }

    case (MESSAGE_ADDED_SUCCESSFULLY): {
      return {
        ...state,
        ...action.payload,
      }
    }

    case (RESET_MESSAGES): {
      const list: string[] = [];
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