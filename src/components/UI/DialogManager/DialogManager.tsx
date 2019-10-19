import React from 'react';

import Modal from '../Modal/Modal';
import { Modal as ModalType, ModalButton, } from 'src/libs/types';
import InformationalMessage from '../Modal/Informational/InformationalMessage';
import { connect } from 'react-redux';
import { closeCurrentModal } from 'src/models/App/app.action.creator';
import { AppState } from 'src/models/App/app.store';
import { getModals } from 'src/models/App/app.selectors';

type Props = {
  modals: ModalType[],
  onModalClosed: Function,
}

const dialogManager = ({ modals, onModalClosed }: Props): JSX.Element | null => (
  (!!modals && modals.length) ?
    <Modal modalClosed={() => onModalClosed()}>
      <>
        <InformationalMessage
          messages={modals[0].messages}
          informationMessageType={modals[0].type}
        />
        {
          modals[0].buttons.map(({ callBack, text }: ModalButton) => (
            <button onClick={() => callBack()}>{text}</button>
          ))
        }
      </>
    </Modal>
    : null
)

const mapStateToProps = (state: AppState) => ({
  modals: getModals(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  onModalClosed: () => {
    dispatch(closeCurrentModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(dialogManager);