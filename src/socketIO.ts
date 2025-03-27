// socketIO.ts
import { io, Socket } from 'socket.io-client';

const URL = 'ws://localhost:3500';

let socket: Socket | null;

export const initializeSocket = (token: string | null) => {
  // Если сокет уже существует - отключаем и очищаем
  if (socket) {
    socket.disconnect();
  }

  // Создаем новое подключение с актуальным токеном
  socket = io(URL, {
    autoConnect: false,
    auth: {
      token: token
    }
  });

  return socket;
};

export const getSocket = () => {
  return socket;
};

export const updateSocketToken = (newToken: string) => {
  if (socket) {
    // Обновляем токен в существующем подключении
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    socket.auth.token = newToken;

    // Если сокет уже подключен - переподключаемся с новым токеном
    if (socket.connected) {
      socket.disconnect().connect();
    }
  }
};

export const deleteSocket = () => {
  if (socket) {
    socket.close();
  }
  socket = null;
}