import { AppState } from "../App/app.store";

export const getMessagesList = (state: AppState): string[] => {
    return !!state.messages.list ? state.messages.list : [];
}