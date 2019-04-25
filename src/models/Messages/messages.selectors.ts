import { AppState } from "../App/app.store";

// By ref
export const getMessagesList = (state: AppState): string[] => [...state.messages.list];
