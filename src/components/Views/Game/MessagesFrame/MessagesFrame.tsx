import React from 'react';
import './MessagesFrame.module.css';
import { AppState } from 'src/models/App/app.store';
import { connect } from 'react-redux';
import { getMessagesList } from 'src/models/Messages/messages.selectors';

interface Props {
  messagesArray: string[]
}

export const messagesFrame = ({ messagesArray }: Props) => (
  <div className="status-wrapper">
    <ul>
      {messagesArray.map(message => <li>{message}</li>)}
    </ul>
  </div>
);

const mapStateToProps = (state: AppState) => {
  return {
    messagesArray: getMessagesList(state),
  }
};

export default connect(mapStateToProps)(messagesFrame);