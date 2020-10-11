export interface User {
    _id?: string;
    username: string;
    avatar?: string;
    online?: boolean;
}

export interface Message {
    _id?: string;
    user: User;
    body: string;
    createdAt: number;
}

export interface OnlineUsers {
    [id: string]: string;
}