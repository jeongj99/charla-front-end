import { io } from 'socket.io-client';
import constructBackendURL from './backendUtils';

const socket = io.connect(constructBackendURL(), {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
