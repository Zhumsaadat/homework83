import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../store/users/usersSlice';
import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import FileInput from './FileInput';
import { selectCreateLoading } from '../store/album/albumSlice';
import { ArtistsMutation } from '../../types';
import { createArtist } from '../store/artist/artistThunk';

const FormArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isCreating = useAppSelector(selectCreateLoading);

  const [artist, setArtist] = useState<ArtistsMutation>({
    name: '',
    image: null,
    info: '',
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createArtist(artist));
    navigate('/');
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setArtist(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <>
      {user && <Box component="form" onSubmit={formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="name"
              name="name"
              autoComplete="name"
              value={artist.name}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="info"
              name="info"
              autoComplete="info"
              value={artist.info}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <FileInput label="image" name="image" onChange={fileInputChangeHandler}/>
        </Grid>
        <Button type="submit">{isCreating ? "loading.." : "Create item"}</Button>
      </Box>}
    </>
  );
};

export default FormArtist;