import React from 'react';

import Modal from '../Modal/Modal';
import { Dialog, ModalButton, } from 'src/libs/types';
import InformationalMessage from '../Modal/Informational/InformationalMessage';
import { connect } from 'react-redux';
import { AppState } from 'src/models/App/app.store';
import { getDialogs } from 'src/models/System/system.selectors';
import { closeCurrentModal } from 'src/models/System/system.actions.creator';

type Props = {
  dialogs: Dialog[],
  onModalClosed: Function,
}

const dialogManager = ({ dialogs, onModalClosed }: Props): JSX.Element | null => (
  (!!dialogs && dialogs.length) ?
    <Modal modalClosed={() => onModalClosed()}>
      <>
        <InformationalMessage
          messages={dialogs[0].messages}
          informationMessageType={dialogs[0].type}
        />
        {
          dialogs[0].buttons.map(({ callBack, text }: ModalButton) => (
            <button onClick={() => callBack()}>{text}</button>
          ))
        }
      </>
    </Modal>
    : null
)

const mapStateToProps = (state: AppState) => ({
  dialogs: getDialogs(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  onModalClosed: () => {
    dispatch(closeCurrentModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(dialogManager);