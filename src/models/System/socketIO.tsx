import socketIOclient from 'socket.io-client';
import store from 'src/models/App/app.store';
import { Action } from 'redux';

const io = socketIOclient('http://localhost:55444');
io.on('connect', () => console.log('Connected'));
io.on('server-event', (action: Action) => store.dispatch(action));
io.on('disconnect', () => console.log('Disconnected from server'));

export default io;