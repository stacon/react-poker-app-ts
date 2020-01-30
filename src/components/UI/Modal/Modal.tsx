// core
import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

// css
import './Modal.css';

type Props = {
  modalClosed: Function,
  children: JSX.Element
}

const modal = ({  modalClosed, children }: Props): JSX.Element | null => (
  <>
    <Backdrop show onClickHandler={() => modalClosed()} />
    <div
      className={'Modal'}
    >
      {children}
    </div>
  </>
);

export default modal;