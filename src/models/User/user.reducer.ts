import UserState from 'src/types/UserState.type';
import { BALANCE_CHANGED_SUCCESSFULLY } from './user.action.creator';

const initialState = {
  name: 'Sergio',
  balance: 1000.00
}

export default function (state: UserState = initialState, action: any) {
  switch (action.type) {
    // TODO: Needs Refactoring
    // case RAISE: {
    //   const raiseAmount: number = action.payload.amount ? action.payload.amount : 0;
    //   const newBalance: number = state.balance - raiseAmount;
    //   return {
    //     ...state,
    //     balance: newBalance
    //   }
    // }
    case BALANCE_CHANGED_SUCCESSFULLY: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state;
    }
  };
};