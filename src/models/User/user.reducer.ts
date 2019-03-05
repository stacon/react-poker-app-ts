import { RAISE, PLACE_ANTE } from '../Game/game.actions.creator';
import UserState from 'src/types/UserState.type';

const initialState = {
  name: 'Sergio',
  balance: 1000.00
}

export default function (state: UserState = initialState, action: any) {
  switch (action.type) {
    case RAISE: {
      const raiseAmount: number = action.payload.amount ? action.payload.amount : 0;
      const newBalance: number = state.balance - raiseAmount;
      return {
        ...state,
        balance: newBalance
      }
    }
    case PLACE_ANTE: {
      const newBalance: number = state.balance - 10;
      return {
        ...state,
        balance: newBalance
      }
    }
    default: {
      return state;
    }
  };
};