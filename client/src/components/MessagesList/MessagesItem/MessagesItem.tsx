import React from 'react';
import { Message, OnlineUsers } from '../../../types';
import { transformUnixToDateSent } from '../../../shared/utility';
import styles from './MessagesItem.module.scss';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);


interface ItemProps {
    message: Message;
    currentlyOnlineUsers: OnlineUsers;
    userId: string | undefined;
}

const MessageItem: React.FC<ItemProps> = ({ message, userId, currentlyOnlineUsers }) => {
    const messageClass = userId === message.user._id ? styles.Sent : styles.Received;
    const timestamp = transformUnixToDateSent(message.createdAt);
    const online = Object.keys(currentlyOnlineUsers).includes(message.user._id ? message.user._id : '');
    return (
        <div className={`${styles.MessageContainer} ${messageClass}`}>
            <div className={styles.MessageTop}>
                {online
                    ? <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot">
                        <Avatar alt={message.user.username} src={message.user.avatar} />
                    </StyledBadge>
                    : <Avatar alt={message.user.username} src={message.user.avatar} />}
                <p className={styles.Timestamp}>{timestamp}</p>
            </div>
            <div className={`${styles.MessageBody} ${messageClass}`}>
                {userId !== message.user._id && <p
                    className={styles.Username}>
                    {message.user.username}
                </p>}
                <p>{message.body}</p>
            </div>
        </div>
    );
};

export default MessageItem;