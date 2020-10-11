import express, { NextFunction, Request, Response } from 'express';
import socket from 'socket.io';
import dotenv from 'dotenv';
import Container from 'typedi';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer, Server } from 'http';
import { ChatEvent } from './consts';
import config from './config';
import routes from './api';
import ChatService from './services/chat';
import { ResponseError } from './interfaces/responseError';
import { Message } from './models/message';
import { OnlineUsers } from './interfaces/onlineUsers';

dotenv.config();

export class ChatServer {
    private _app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number | string;
    private chatService: ChatService = Container.get(ChatService);
    private currentlyOnlineUsers: OnlineUsers = {};

    constructor() {
        this.port = config.port;
        this._app = express();
        this._app.use(cors());
        this._app.use(bodyParser.json());
        this._app.use(routes());
        this._app.options('*', cors());
        this._app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500);
            res.json({
                message: err.message,
            });
        });

        this.server = createServer(this._app);
        this.initSocket();
        this.listen();
    }

    private initSocket(): void {
        this.io = socket(this.server);
    }

    private async connectToDB() {
        const connection = await mongoose.connect(`mongodb+srv://${config.databaseUser}:${config.databasePass}${config.databaseURL}`, { useNewUrlParser: true });
        if (!connection) {
            throw new Error('Cant connect to DB!');
        }
    }

    private listen() {

        this.server.listen(this.port, async () => {
            await this.connectToDB();
            console.log('Connected to database and running server on port %s', this.port);
        });

        this.io.on(ChatEvent.Connect, (socket: socket.Socket) => {
            console.log('Connected client on port %s.', this.port);

            socket.on(ChatEvent.InitMessages, async (userId: string) => {
                const messagesRecords = await this.chatService.getRecentMessages();
                this.currentlyOnlineUsers[userId] = userId;
                socket.id = userId;
                this.io.emit(ChatEvent.InitMessages, messagesRecords, this.currentlyOnlineUsers);
            });

            socket.on(ChatEvent.NewMessage, async (message: Message) => {
                const messageRecord = await this.chatService.addNewMessage(message);
                this.io.emit(ChatEvent.NewMessage, messageRecord);
            });

            socket.on(ChatEvent.Disconnect, () => {
                delete this.currentlyOnlineUsers[socket.id];
                this.io.emit(ChatEvent.Disconnect, this.currentlyOnlineUsers);
            });
        });
    }

    get app(): express.Application {
        return this._app;
    }
}