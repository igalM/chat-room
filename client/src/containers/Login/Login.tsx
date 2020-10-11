import React, { useState } from 'react';
import styles from './Login.module.scss';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { fileValidationError, signInWithUsername } from '../../store/actions/auth';
import { selectSignInLoading } from '../../store/reducers/selectors';
import { User } from '../../types';
import styled from 'styled-components'
import Form from '../../components/LoginForm/LoginForm';

const Label = styled.label`
border-radius: 6.25em;
background-color: white;
width: 200px;
height: 65px;
outline: 0;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: 700;
`;

const Login: React.FC = () => {
    const [authMode, setAuthMode] = useState(false);

    const loading = useSelector(selectSignInLoading);

    const dispatch = useDispatch();

    const signInUsername = (user: User) => dispatch(signInWithUsername(user));
    const fileInvalid = () => dispatch(fileValidationError());

    const connectToChatRoom = (newUser: User) => {
        setAuthMode(false);
        signInUsername(newUser);
    }

    return (
        <div className={styles.Login}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={authMode ? "Form" : "Button"}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames={{
                        enter: styles.FadeEnter,
                        enterActive: styles.FadeEnterActive,
                        exit: styles.FadeExit,
                        exitActive: styles.FadeExitActive
                    }}>
                    {authMode
                        ? <Form
                            fileError={fileInvalid}
                            submit={(user: User) => connectToChatRoom(user)} />
                        : <Label
                            onClick={() => !loading && setAuthMode(true)}>
                            {loading ? 'Connecting...' : 'Start Chatting!'}
                        </Label>}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default Login;