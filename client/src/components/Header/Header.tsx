import React from 'react';
import styles from './Header.module.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';

interface Props {
    onlineUsers: number;
    onLogoutClicked: () => void;
}

const Header: React.FC<Props> = ({ onlineUsers, onLogoutClicked }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogoutClicked = () => {
        handleMenuClose();
        onLogoutClicked();
    }


    return (
        <header className={styles.Header}>
            <h2>{onlineUsers} Online</h2>
            <IconButton className={styles.Menu} color="inherit" onClick={handleMenuClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem>
            </Menu>
        </header>
    );
}

export default Header;