import { AppState } from "../App/app.store";
import { UserInformation } from 'src/types';

export const getUserInfo = (state: AppState): UserInformation => state.user;
export const getNumberOfSelectedPlayers = (state: AppState): number => state.app.numberOfPlayersSelected;