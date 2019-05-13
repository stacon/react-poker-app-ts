import { AppState } from "../App/app.store";
import Message from 'src/types/Message.type';

// By ref
export const getMessagesList = (state: AppState): Message[] => [...state.messages.list];

// By val
export const getUserBalance = (state: AppState): number => state.user.balance;
