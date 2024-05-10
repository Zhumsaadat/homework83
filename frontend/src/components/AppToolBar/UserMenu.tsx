import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch } from '../../app/hooks';
import { unsetUser } from '../../store/users/usersSlice';
import { logout } from '../../store/users/usersThunk';


const UserMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useAppDispatch();


  const handleLogout = () => {
    dispatch(unsetUser());
  };

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
                <PersonIcon/>

            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleNav}>Track history</MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;