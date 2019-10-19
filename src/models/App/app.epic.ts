import { map } from 'rxjs/internal/operators/map';
import { ofType, combineEpics, ActionsObservable, StateObservable, } from "redux-observable";
import { Action } from 'redux';
import { Modal, } from 'src/libs/types';
import { CLOSE_CURRENT_MODAL, modalUpdatedSuccessfully, ADD_MODAL } from './app.action.creator';
import { getModals } from './app.selectors';
import { AppState } from './app.store';

const onCloseModalEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CLOSE_CURRENT_MODAL),
  map(() => {
    const currentModals: Modal[] = getModals(state$.value);
    const modals: Modal[] = !!currentModals && currentModals.length ? currentModals.slice(1) : currentModals;
    return modalUpdatedSuccessfully({modals})
  })
);

const onAddModalEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(ADD_MODAL),
  map(({payload: newModal}: any) => {
    const currentModals: Modal[] = getModals(state$.value);
    const modals: Modal[] = [...currentModals, newModal];
    return modalUpdatedSuccessfully({modals})
  })
);

export default combineEpics(
  onAddModalEpic,
  onCloseModalEpic,
)