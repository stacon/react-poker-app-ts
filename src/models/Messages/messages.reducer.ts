import { INITIALIZE_MESSAGES } from './messages.action.creator';

// import { SHOW_HAND_VALUE } from './messages.action.creator';

export interface MessagesState {
  messagesArray?: string[]
}

export default function (state: MessagesState = {}, action: any) {
  switch (action.type) {
    case (INITIALIZE_MESSAGES): {
      const messages: string[] = [];
      console.log(messages);
      return {
        ...state,
        messagesArray: messages.push('TEST')
      }
    }
    default: {
      return state;
    }
  };
};