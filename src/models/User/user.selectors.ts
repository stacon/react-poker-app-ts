import { AppState } from "../App/app.store";
import { UserInformation } from 'src/types';

// By ref
export const getUserInfo = (state: AppState): UserInformation => ({...state.user});

// By val
export const getNumberOfSelectedPlayers = (state: AppState): number => state.app.numberOfPlayersSelected;