import { Modal, IndexState } from 'src/libs/types';
import { AppState } from './app.store';

// By ref
export const getIndexState = (state: AppState): IndexState => state.app;
export const getModals = (state: AppState): Modal[] => [...getIndexState(state).modals];