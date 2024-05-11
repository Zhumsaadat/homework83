import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch } from '../../app/hooks';
import { unsetUser } from '../../store/users/usersSlice';


const UserMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useAppDispatch();
    const pathnameParts = location.pathname.split('/');
    const firstPart = pathnameParts[1];


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

    const handleAddAlbum = () => {
      navigate('/addAlbum');
    }

    function handleAddArtist() {
     navigate('/addArtist');
    }

  function handleAddTrack() {
    navigate('/addTrack');
  }

  console.log(firstPart);

  return (
        <>
            <Button color="inherit" onClick={handleClick}>
                <PersonIcon/>

            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem onClick={handleAddArtist}>Add Artist</MenuItem>
                {firstPart === 'albums'?  (<MenuItem onClick={handleAddAlbum}>Add Album</MenuItem>) : null}
                {firstPart === 'tracks'?  (<MenuItem onClick={handleAddTrack}>Add Track</MenuItem>) : null}
                <MenuItem onClick={handleNav}>Track history</MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;