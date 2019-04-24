import { RAISE } from '../Game/game.actions.creator';
import { MESSAGE_ADDED_SUCCESSFULLY, RESET_MESSAGES } from './messages.action.creator';
import MessagesState from 'src/types/MessagesState.type';

const initialState: MessagesState = {
  list: [],
}

export default function (state: MessagesState = initialState, action: any) {
  switch (action.type) {
    case (RAISE): {
      const list= [
         ...state.list,
         `SERGIO RAISED TO ${action.payload.amount} $`,
       ];
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
      return {
        ...state,
        list: [],
      }
    }
    
    default: {
      return state;
    }
  };
};