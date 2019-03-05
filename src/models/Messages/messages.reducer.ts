import { DEAL_CARDS, RAISE, RESET_MESSAGES, PLACE_ANTE, CALL, CHECK } from '../Game/game.actions.creator';
import { ADD_MESSAGE } from './messages.action.creator';
import MessagesState from 'src/types/MessagesState.type';

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

    case (CALL): {
      const list=  (state.list) ?
       [
         ...state.list,
         `ALL PLAYERS CALLED!`,
       ] : [];
      return {
        ...state,
        list
      }
    }

    case (CHECK): {
      const list=  (state.list) ?
       [
         ...state.list,
         `ALL PLAYERS CHECKED!`,
       ] : [];
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
    // OPINION: Giati kaneis reset ta messages? Then mas peirazei na gemizei me log kai na deixnei panta to pio prosfato
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