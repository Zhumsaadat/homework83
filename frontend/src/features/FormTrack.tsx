import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../store/users/usersSlice';
import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { selectAlbums, selectCreateLoading } from '../store/album/albumSlice';
import { TracksMutation } from '../../types';
import { createTrack } from '../store/track/trackThunk';

const FormTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);
  const isCreating = useAppSelector(selectCreateLoading);

  const [track, setTrack] = useState<TracksMutation>({
    album: '',
    name: '',
    duration: '',
    sequence: 0,
    isPublished: false,
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createTrack(track));
    navigate('/');
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChange = (e: SelectChangeEvent) => {
    setTrack((prevState) => ({
      ...prevState,
      album: e.target.value,
    }));
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
              value={track.name}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="duration"
              name="duration"
              autoComplete="duration"
              value={track.duration}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="number"
              label="sequence"
              name="sequence"
              autoComplete="sequence"
              value={track.sequence}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Album"
              id="album"
              name="album"
              value={track.album}
              onChange={selectChange}
              fullWidth
            >
              {albums.length > 0 &&
              albums.map((item) => {
                return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>;
              })}
            </Select>
          </Grid>
          </Grid>
        <Button type="submit">{isCreating ? "loading.." : "Create item"}</Button>
      </Box>}
    </>
  );
};

export default FormTrack;