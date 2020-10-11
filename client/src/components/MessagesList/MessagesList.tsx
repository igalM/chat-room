import React from 'react';
import { Message, OnlineUsers } from '../../types';
import MessageItem from './MessagesItem/MessagesItem';
import styles from './MessagesList.module.scss';

interface ListProps {
    messages: Message[];
    currentlyOnlineUsers: OnlineUsers;
    userId: string | undefined;
}

const MessagesList: React.FC<ListProps> = ({ messages, userId, currentlyOnlineUsers }) => {
    const content = messages.map((item, index) => (
        <MessageItem
            key={`${item._id}${index}`}
            message={item}
            userId={userId}
            currentlyOnlineUsers={currentlyOnlineUsers}
        />
    ));
    return (
        <div className={styles.List}>
            {content}
        </div>
    );
}

export default React.memo(MessagesList);