import { AppState } from "../App/app.store";

// By ref
export const getMessagesList = (state: AppState): string[] => {
    return !!state.messages.list ? [...state.messages.list] : [];
}