import { START_GAME } from '../Game/game.actions.creator';

export interface MessagesState {
  list?: string[]
}

export default function (state: MessagesState = {list: []}, action: any) {
  switch (action.type) {
    case (START_GAME): {
      console.log('Mpike mesa');
      return {
        ...state,
        list: []
      }
    }
    default: {
      return state;
    }
  };
};