import { RAISE } from '../Game/game.actions.creator';

export interface UserState {
  name: string,
  balance: number
}

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
    default: {
      return state;
    }
  };
};