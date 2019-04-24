import { ofType, combineEpics, ActionsObservable, StateObservable } from "redux-observable";
import { CARDS_DEALT, ANTE_PLACED_SUCCESSFULLY, resetMessages, GAME_STARTED } from '../Game/game.actions.creator';
import { map } from 'rxjs/internal/operators/map';
import { addMessage, messageAddedSuccessfully, ADD_MESSAGE } from './messages.action.creator';
import { Action } from 'redux';
import { AppState } from '../App/app.store';
import { getMessagesList } from './messages.selectors';

const startGameEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(GAME_STARTED),
  map(() => resetMessages())
)

const cardsDealtEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(CARDS_DEALT),
  map(() => addMessage('HANDS DEALT! GOOD LUCK'))
);

const antesPlacedEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(ANTE_PLACED_SUCCESSFULLY),
  map(() => addMessage('PLAYERS PLACED THEIR ANTES'))
);

const addMessageEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(ADD_MESSAGE),
  map((action: any) => {
    console.log('state ', state$)
    const list: string[] = getMessagesList(state$.value);
    return messageAddedSuccessfully({list})
  }),
);

export default combineEpics(
  startGameEpic,
  antesPlacedEpic,
  addMessageEpic,
  cardsDealtEpic,
)