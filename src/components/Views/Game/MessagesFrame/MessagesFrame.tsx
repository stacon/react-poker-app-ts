import React from 'react';
import './MessagesFrame.module.css';
import { AppState } from 'src/models/App/app.store';
import { connect } from 'react-redux';

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
    messagesArray: state.messages.list
  }
};

export default connect(mapStateToProps)(messagesFrame);