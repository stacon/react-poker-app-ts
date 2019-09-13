import { Action } from 'redux';
import io from '../../system/socketIO';

const socketMiddleWare = () => (next: Function) => (action: Action) => {
  console.log('Socket Middleware triggered');
  console.log(action);
  console.log('===========================');
  if(action.type === 'TO_SERVER') {
    io.emit('client-action', action);
    return;
  }
  next(action)
}

export default socketMiddleWare;