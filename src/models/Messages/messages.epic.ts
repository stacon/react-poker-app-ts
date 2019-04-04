import { ofType, combineEpics } from "redux-observable";
import { CARDS_DEALT, ANTE_PLACED_SUCCESSFULLY } from '../Game/game.actions.creator';
import { map } from 'rxjs/internal/operators/map';
import { addMessage, messageAddedSuccessfully, ADD_MESSAGE } from './messages.action.creator';

const cardsDealtEpic = (action$: any) => action$.pipe(
  ofType(CARDS_DEALT),
  map(() => addMessage('HANDS DEALT! GOOD LUCK'))
);

const antesPlacedEpic = (action$: any) => action$.pipe(
  ofType(ANTE_PLACED_SUCCESSFULLY),
  map(() => addMessage('PLAYERS PLACED THEIR ANTES'))
);

const addMessageEpic = (action$: any, state$: any) => action$.pipe(
  ofType(ADD_MESSAGE),
  map((action: any) => {
    console.log('state ', state$)
    const list: string[] = (state$.value.messages.list) ? [...state$.value.messages.list, action.payload.message] : [];
    return messageAddedSuccessfully({list})
  }),
);

export default combineEpics(
  antesPlacedEpic,
  addMessageEpic,
  cardsDealtEpic,
)