import { io, Socket } from 'socket.io-client';

const GAME_SERVER_URL = import.meta.env.VITE_GAME_SERVER_URL || 'http://localhost:3001';

let socketInstance: Socket | null = null;

export const getGameSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(GAME_SERVER_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
    });
  }
  return socketInstance;
};
