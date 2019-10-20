import { Dialog, SystemState } from 'src/libs/types';
import { AppState } from '../App/app.store';

// By ref
export const getSystemState = (state: AppState): SystemState => state.system;
export const getDialogs = (state: AppState): Dialog[] => [...getSystemState(state).dialogs];