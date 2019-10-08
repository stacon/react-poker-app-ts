import { SystemAction } from 'src/libs/types';
import { TO_SERVER } from '../../System/system.actions.creator';
import emitToServer from '../../System/socketIO';

const socketMiddleWare = () => (next: Function) => (action: SystemAction) => {
  if (action.type === TO_SERVER) {
    emitToServer(action.payload);
  }
  next(action);
}

export default socketMiddleWare;