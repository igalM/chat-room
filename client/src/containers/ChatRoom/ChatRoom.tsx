import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatRoom.module.scss';
import { logoutUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import useChat from '../../hooks/useChat';
import MessagesList from '../../components/MessagesList/MessagesList';
import { isMobile } from 'react-device-detect';
import LogoutDialog from '../../components/UI/LogoutDialog/LogoutDialog';
import NewMessageForm from '../../components/NewMessageForm/NewMessageForm';
import { OnlineUsers } from '../../types';
import Header from '../../components/Header/Header';

const calcOnlineUsers = (users: OnlineUsers) => Object.keys(users).length;

const ChatRoom: React.FC = () => {
    const { messages, sendMessage, user, currentlyOnlineUsers } = useChat();
    const [showDialog, setShowDialog] = useState(false);

    const scrollToDummyDiv = useRef<HTMLDivElement>(null);

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const logoutCurrentUser = () => {
        dispatch(logoutUser(user?._id ? user._id : ''));
        toggleDialog();
    };

    useEffect(() => {
        scrollToDummyDiv.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);


    const toggleDialog = () => setShowDialog(!showDialog);

    const textareaEnterPressed = (e: React.KeyboardEvent) => {
        if (isMobile) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            submitMessage(e);
        }
    }

    const submitMessage = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        if (message.trim() !== '') {
            sendMessage(message);
        }
        setMessage('');
    }

    const handleMobileFocus = () => {
        if (isMobile) {
            setTimeout(() => {
                scrollToDummyDiv.current?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100)
        }
    }

    const onlineUsers = useMemo(() => calcOnlineUsers(currentlyOnlineUsers), [currentlyOnlineUsers]);

    return (
        <div className={styles.ChatRoom}>
            <Header
                onlineUsers={onlineUsers}
                onLogoutClicked={toggleDialog}
            />
            <section className={styles.Section}>
                <main className={styles.Main}>
                    <MessagesList
                        messages={messages}
                        userId={user?._id && user._id}
                        currentlyOnlineUsers={currentlyOnlineUsers}
                    />
                    <div ref={scrollToDummyDiv}></div>
                </main>
                <NewMessageForm
                    message={message}
                    onSubmit={e => submitMessage(e)}
                    onFocus={handleMobileFocus}
                    onEnterPressed={e => textareaEnterPressed(e)}
                    onChange={e => setMessage(e)}
                />
            </section>
            <LogoutDialog
                show={showDialog}
                handleClose={toggleDialog}
                logout={logoutCurrentUser} />
        </div>
    );
};

export default ChatRoom;