import { AppState } from "../App/app.store";

// By ref
export const getMessagesList = (state: AppState): string[] => [...state.messages.list];

// By val
export const getUserBalance = (state: AppState): number => state.user.balance;
