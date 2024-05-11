import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../store/users/usersSlice';
import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import FileInput from './FileInput';
import { selectCreateLoading } from '../store/album/albumSlice';
import { AlbumMutation } from '../../types';
import { createAlbum } from '../store/album/albumThunk';
import { selectArtists } from '../store/artist/artistSlice';

const FormAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);
  const isCreating = useAppSelector(selectCreateLoading);

  const [album, setAlbum] = useState<AlbumMutation>({
    singer: '',
    name: '',
    date: '',
    image: null,
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createAlbum(album));
    navigate('/');
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChange = (e: SelectChangeEvent) => {
    setAlbum((prevState) => ({
      ...prevState,
      singer: e.target.value,
    }));
  };


  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setAlbum(prevState => ({
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
              value={album.name}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="number"
              label="date"
              name="date"
              autoComplete="date"
              value={album.date}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Категория"
              id="category"
              name="category"
              value={album.singer}
              onChange={selectChange}
              fullWidth
            >
              {artists.length > 0 &&
              artists.map((item) => {
                return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>;
              })}
            </Select>
          </Grid>
          <FileInput label="image" name="image" onChange={fileInputChangeHandler}/>
        </Grid>
        <Button type="submit">{isCreating ? "loading.." : "Create item"}</Button>
      </Box>}
    </>
  );
};

export default FormAlbum;