import React, { useState } from 'react';
import { UserTypes } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNav = () => {
        navigate('/track_history');
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Hello, {user.username}!
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleNav}>Track history</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;