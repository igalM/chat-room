import React, { Fragment } from 'react';
import styles from './NewMessageForm.module.scss';
import SendIcon from '@material-ui/icons/Send';

interface Props {
    message: string;
    onSubmit: (e: React.SyntheticEvent<EventTarget>) => void;
    onFocus: () => void;
    onEnterPressed: (e: React.KeyboardEvent) => void;
    onChange: (message: string) => void;
}

const NewMessageForm: React.FC<Props> = ({
    message,
    onSubmit,
    onFocus,
    onEnterPressed,
    onChange
}) => {
    return (
        <Fragment>
            <form className={styles.Form} onSubmit={onSubmit}>
                <textarea
                    placeholder="Start typing here..."
                    value={message}
                    onFocus={onFocus}
                    onKeyPress={e => onEnterPressed(e)}
                    onChange={e => onChange(e.target.value)}
                    className={styles.Textarea}></textarea>
                {message !== '' && <button className={styles.Button} type="submit">
                    <SendIcon fontSize="large" style={{ color: '#6649b8' }} />
                </button>}
            </form>
        </Fragment>
    );
}

export default NewMessageForm;