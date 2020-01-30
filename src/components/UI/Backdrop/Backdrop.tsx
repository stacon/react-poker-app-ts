// core
import React from 'react';

// css
import './Backdrop.css';

type Props = {
  show: boolean,
  onClickHandler: Function,
}

const backdrop = ({ show, onClickHandler }: Props): JSX.Element | null => (
  show ?
  <div
    className={'Backdrop'}
    onClick={() => onClickHandler()}
  > </div>
  : null
);

export default backdrop;