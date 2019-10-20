import socketIOclient from 'socket.io-client';
import store from 'src/models/App/app.store';
import { Action } from 'redux';
import { InformationalMessageType } from 'src/enums';
import { addModal } from './system.actions.creator';

const io = socketIOclient('http://localhost:55444');
io.on('connect', () => store.dispatch(addModal({
  messages: ['Connected on socket!', 'Welcome!'],
  type: InformationalMessageType._Success,
  buttons: []
})));

io.on('server-event', (action: Action) => store.dispatch(action));

const emitToServer = (action: Action) => io.emit('client-event', action);

export default emitToServer;