import React from 'react';
import './StatusFrame.module.css';

interface Props {
  messages: string[];
}

export const statusFrame = ({ messages }: Props) => (
  <div className="status-wrapper">
    <ul>
      {messages.map(message => <li>{message}</li>)}
    </ul>
  </div>
)