import React from 'react';

import { InformationalMessageType } from 'src/enums';

import './InformationalMessage.css';
const icons = 'assets/img/icons/';

type Props = {
  informationMessageType: InformationalMessageType,
  messages: string[],
}

const informationalMessage = ({informationMessageType, messages}: Props): JSX.Element => (
  <>
    <div className={'header-image'}>
      <img src={`${icons}${informationMessageType}.png`} alt={informationMessageType}/>
    </div>
    <div className={'modal-body'}>
      {
        messages.map(message => (
          <>
          <div className={"modal-body-msg"}>
            {message}
          </div>
          </>
        ))
      }
    </div>
  </>
);

export default informationalMessage;