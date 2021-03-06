import { map } from 'rxjs/internal/operators/map';
import { ofType, combineEpics, ActionsObservable, StateObservable } from "redux-observable";
import {
  CARDS_DEALT,
  ANTE_PLACED_SUCCESSFULLY,
  GAME_STARTED,
  EVALUATION_COMPLETED,
  RAISE,
  REPLACE_CARDS,
  CALL_CHECK,
} from '../Game/game.actions.creator';
import {
  ADD_MESSAGE,
  addMessage,
  messageAddedSuccessfully,
  resetMessages
} from './messages.action.creator';
import { Action } from 'redux';
import { AppState } from '../App/app.store';
import { getMessagesList } from './messages.selectors';
import { IPlayer } from 'src/types';
import { getPlayerById, getActivePlayers } from '../Game/game.selectors';
import Message from 'src/types/Message.type';
import { count } from 'rxjs/operators';

const cardsDealtEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(CARDS_DEALT),
  map(() => addMessage({text: 'Hands Dealt! Good Luck'})),
);

const onRaiseRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(RAISE),
  map((action: any) => {
    const { payload } = action;
    const { amount, pid } = payload;
    const player: IPlayer = getPlayerById(state$.value, pid);
    return addMessage({text: `${player.name} raised by ${amount.toFixed(2)} $.`})
  }),
)

const callRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CALL_CHECK),
  map((action: any) => {
    const { payload } = action;
    const { pid } = payload;
    const player = getPlayerById(state$.value, pid);
    return addMessage({text: `${player.name} called/checked.`})
  })
)

const onReplaceCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(REPLACE_CARDS),
  map((action: any) => {
    const { payload } = action;
    const { pid, cardsForReplacement } = payload;
    const players: IPlayer[] = getActivePlayers(state$.value);

    return addMessage({text: 
      cardsForReplacement < 1 ?
        `${players[pid].name} didn't replace any cards.` :
        `${players[pid].name} replaced ${cardsForReplacement} cards.`
    });
  }),
);

const onEvaluationCompletionEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(EVALUATION_COMPLETED),
  map((action: any) => {
    const { payload } = action;
    const { playerWon, winningHand } = payload;
    return addMessage({text: 
      `Winner is ${playerWon.name} with ${winningHand}`,
    })
  }),
)

const startGameEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(GAME_STARTED),
  map(() => resetMessages()),
);

const antesPlacedEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(ANTE_PLACED_SUCCESSFULLY),
  count(),
  map((i) => addMessage({text: 'Players Placed their Antes!'})),
);

const addMessageEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(ADD_MESSAGE),
  map((action: any) => {
    const { payload } = action;
    const { text } : { text: string } = payload;
    const messagesList = getMessagesList(state$.value)
    const list: Message[] = [...messagesList, {id: messagesList.length +1, text}];
    return messageAddedSuccessfully({ list })
  }),
);

export default combineEpics(
  callRequestEpic,
  cardsDealtEpic,
  antesPlacedEpic,
  addMessageEpic,
  startGameEpic,
  onEvaluationCompletionEpic,
  onRaiseRequestEpic,
  onReplaceCardsEpic,
)