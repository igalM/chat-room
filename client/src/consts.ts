export const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCALHOST : process.env.REACT_APP_API_URI;

export enum ChatEvent {
    InitMessages = 'InitMessages',
    NewMessage = 'NewMessage',
    Disconnect = 'disconnect'
}
