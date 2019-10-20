import { SystemState } from 'src/libs/types';
import { DIALOGS_UPDATED_SUCCESSFULLY } from './system.actions.creator';

const initialState: SystemState = {
  dialogs: [],
}

export default function (state: SystemState = initialState, action: any) {
  switch (action.type) {

    case (DIALOGS_UPDATED_SUCCESSFULLY): {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  };
};