// import { Action } from 'redux';
import io from '../../System/socketIO';
import { SystemAction } from 'src/libs/types';
import { TO_SERVER } from '../../System/system.actions.creator';

const socketMiddleWare = () => (next: Function) => (action: SystemAction) => {
  action.type === TO_SERVER && io.emit('client-event', action.payload);
  next(action)
}

export default socketMiddleWare;