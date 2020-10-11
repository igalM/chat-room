import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { BASE_URL, ChatEvent } from "../consts";
import { transformDateToUnix } from "../shared/utility";
import { selectCurrentUser } from "../store/reducers/selectors";
import { Message, OnlineUsers } from "../types";
const notificationSound = require('../assets/notification-sound.mp3');


const useChat = () => {
    const [playing, setPlaying] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentlyOnlineUsers, setCurrentlyOnlineUsers] = useState<OnlineUsers>({});

    const user = useSelector(selectCurrentUser);

    const audio = new Audio(notificationSound);

    const socketRef = useRef<SocketIOClient.Socket>();

    const fetchLatestMessages = useCallback(() => {
        socketRef.current?.emit(ChatEvent.InitMessages, user?._id);
    }, [user]);

    useEffect(() => {

        if (user) {

            socketRef.current = socketIOClient.connect(
                `${BASE_URL}`,
                {
                    transports: ['websocket'],
                    rejectUnauthorized: false,
                    secure: true
                }
            )

            socketRef.current.on(ChatEvent.NewMessage, (message: Message) => {
                if (message.user._id !== user._id) {
                    setPlaying(true);
                }
                setMessages((messages) => [...messages, message]);
            });

            socketRef.current.on(ChatEvent.InitMessages, (messages: Message[], onlineUsers: OnlineUsers) => {
                setCurrentlyOnlineUsers(onlineUsers);
                setMessages(messages.reverse());
            });

            socketRef.current.on(ChatEvent.Disconnect, (onlineUsers: OnlineUsers | string) => {
                if (typeof onlineUsers !== 'string') {
                    setCurrentlyOnlineUsers(onlineUsers);
                }
            });

            fetchLatestMessages();

        }
        return () => {
            socketRef.current?.disconnect();
        };
    }, [user, playing, fetchLatestMessages]);

    useEffect(() => {
        if (playing) {
            audio.play();
        }
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio, playing]);

    const sendMessage = (message: string) => {
        socketRef.current?.emit(ChatEvent.NewMessage, {
            user: user,
            body: message,
            createdAt: transformDateToUnix()
        });
    };


    return { messages, sendMessage, user, currentlyOnlineUsers };
};

export default useChat;