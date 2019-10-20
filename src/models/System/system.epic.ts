import { map } from 'rxjs/internal/operators/map';
import { ofType, combineEpics, ActionsObservable, StateObservable, } from "redux-observable";
import { Action } from 'redux';
import { Dialog, } from 'src/libs/types';
import { AppState } from '../App/app.store';
import { CLOSE_CURRENT_DIALOG, modalUpdatedSuccessfully, ADD_DIALOG } from './system.actions.creator';
import { getDialogs } from './system.selectors';

const onCloseModalEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CLOSE_CURRENT_DIALOG),
  map(() => {
    const currentDialogs: Dialog[] = getDialogs(state$.value);
    const dialogs: Dialog[] = !!currentDialogs && currentDialogs.length ? currentDialogs.slice(1) : currentDialogs;
    return modalUpdatedSuccessfully({dialogs})
  })
);

const onAddModalEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(ADD_DIALOG),
  map(({payload: newModal}: any) => {
    const currentDialogs: Dialog[] = getDialogs(state$.value);
    const dialogs: Dialog[] = [...currentDialogs, newModal];
    return modalUpdatedSuccessfully({dialogs})
  })
);

export default combineEpics(
  onAddModalEpic,
  onCloseModalEpic,
)