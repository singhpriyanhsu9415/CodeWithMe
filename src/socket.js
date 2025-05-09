import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    try {
        const socket = io(process.env.REACT_APP_BACKEND_URL, options);
        console.log('Socket connected', socket.id);
        return socket;
    } catch (error) {
        console.error('Socket connection error:', error);
        throw error;
    }
};