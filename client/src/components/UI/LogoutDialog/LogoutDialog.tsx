import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';

interface Props {
    show: boolean;
    handleClose: () => void;
    logout: () => void;
}

const LogoutDialog: React.FC<Props> = ({ show, handleClose, logout }) => {
    return (
        <Dialog
            style={{ textAlign: 'center' }}
            open={show}
            onClose={handleClose}>
            <DialogTitle >
                Are you sure?
        </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you log out you won't be able to login with this username!
        </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={logout} color="primary">
                    Confirm</Button>
                <Button onClick={handleClose} color="primary">
                    Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialog;