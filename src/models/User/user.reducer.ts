import UserState from 'src/types/UserState.type';
import { BALANCE_CHANGED_SUCCESSFULLY } from './user.action.creator';

const initialState = {
  name: 'Sergio',
  balance: 1000.00
}

export default function (state: UserState = initialState, action: any) {
  switch (action.type) {
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