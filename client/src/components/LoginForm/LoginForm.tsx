import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import styles from './LoginForm.module.scss';
import styled from 'styled-components'
import { fileValidation } from '../../shared/utility';

const Container = styled.div`
height: 65px;
position: relative;
padding: 0.625em;
box-sizing: border-box;
font-weight: 700;
box-sizing: border-box;
box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.3);
display: flex;
justify-content: center;
border-radius: 6.25em;
background-color: white;
transition: 300ms;
`;

const StyledInput = styled.input`
font-weight: 700;
font-size: 18px;
border: 0;
outline: 0;
border-radius: 5em;
box-sizing: border-box;
height: 100%;
width: 100%;
padding: 0 0.714em;
background-color: white;
color: #1c1f25;`;

const StyledButton = styled.button`
background-color: #282c34;
color: white;
height: 100%;
width: auto;
font-size: 18px;
padding: 0;
height: 100%;
width: 160px;
border: 0;
font-weight: 700;
outline: 0;
border-radius: 5em;
box-sizing: border-box;
cursor: pointer;`

interface Props {
    submit: (formData: any) => void;
    fileError: () => void;
}

const LoginForm: React.FC<Props> = ({ submit, fileError }) => {
    const [username, setUsername] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loadingFile, setLoadingFile] = useState(false);

    useEffect(() => {
        if (file) {
            setLoadingFile(true);
            setTimeout(() => {
                setLoadingFile(false);
            }, 1000)
        }

    }, [file])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('username', username);
        submit(formData);
    }

    const handleFileChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        if (file) {
            if (fileValidation(file)) {
                setFile(file);
            } else {
                fileError();
            }
        }
    }

    let buttonText = 'Upload Profile Picture';
    if (loadingFile) {
        buttonText = 'Uploading File...';
    }
    if (file && !loadingFile) {
        buttonText = 'Success!';
    }


    return (
        <form className={styles.Form}
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data">
            <Container>
                <StyledInput
                    onChange={(e) => setUsername(e.target.value.trim())}
                    type="text"
                    placeholder="Username" />
                <StyledButton disabled={username === ''} type="submit">Let's Go!</StyledButton>
            </Container>
            <input
                accept="image/*"
                className={styles.Input}
                id="contained-button-file"
                type="file"
                onChange={handleFileChanged}
            />
            <label className={styles.ButtonContainer} htmlFor="contained-button-file">
                <Button
                    className={styles.UploadButton}
                    variant="contained"
                    color="primary"
                    component="span">
                    {buttonText}
                </Button>
            </label>
        </form>
    );
}

export default LoginForm;