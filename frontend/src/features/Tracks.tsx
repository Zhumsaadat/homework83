import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectIsLoading, selectTracks } from '../store/track/trackSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { selectArtists } from '../store/artist/artistSlice';
import { selectAlbums } from '../store/album/albumSlice';
import { selectUser } from '../store/users/usersSlice';
import { deleteTrack, getTracks, publishTrack, tracksHistoryPost } from '../store/track/trackThunk';
import { getAlbums } from '../store/album/albumThunk';
import { getArtists } from '../store/artist/artistThunk';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const Tracks = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isLoading = useAppSelector(selectIsLoading);
    const artistName = useAppSelector(selectArtists);
    const albumName = useAppSelector(selectAlbums);
    const user = useAppSelector(selectUser);

    const params = useParams();

    const album = albumName.find(elem => elem._id === params.id);
    const artist = artistName.find(elem => elem._id === album?.singer);


    useEffect(() => {
        const fetchUrl = async () => {
            if (params.id) {
                await dispatch(getTracks(params.id));

                if (artist) {
                    await dispatch(getAlbums(artist._id));
                    await dispatch(getArtists());
                }
            }
        };

        void fetchUrl();
    }, [dispatch, params.id]);

    const tracksHistory = async (data: string) => {
        if (user) {
          const trackHistory = {
            token: user.token,
            track: data
          }
            await dispatch(tracksHistoryPost(trackHistory));
        }
    };

  const onDelete = async (id: string) => {
    if(user.role !== "admin"){
      alert('You do not have the right to delete!');
    }
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(deleteTrack(id));
      if(params.id) {
        await dispatch(getTracks(params.id));
      }
    }
  };

  const onPublish = async (id: string) => {
    if(user.role !== "admin"){
      alert('You do not have the right to delete!');
    }
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(publishTrack(id));
      if(params.id) {
        await dispatch(getTracks(params.id));
      }
    }
  };

  const tracksForUsers = tracks.filter(track => track.isPublished);

    return (
        <>
            {album && artist && <Typography variant="h4">Artist: {artist.name}, Album: {album.name}</Typography>}

            <Grid container>
                {!isLoading ? (
                  user?.role === "admin"  && user ? tracks.map((elem) => (
                  <Grid item  xs={12} sm={12} md={12} key={elem._id} style={{ marginTop: '20px' }}>
                     <Paper elevation={3} sx={{position: 'relative', padding: '12px' }} >
                    <Grid container >
                      {elem.isPublished ? null : (
                        <Alert variant="filled" severity="error" sx={{ position: 'absolute', top: 0, right: 0 , zIndex: 1}}>
                          не опубликовано
                        </Alert>
                      )}
                      <Grid item xs={2} onClick={() => tracksHistory(elem._id)}>
                        <PlayCircleIcon />
                      </Grid>
                      <Grid item xs={2}  sm={2}  md={2} >
                        {elem.sequence}
                      </Grid>
                      <Grid item xs={6}  sm={6}  md={6}>
                        {elem.name}
                      </Grid>
                      <Grid item xs={2}  sm={2}  md={2}>
                        {elem.duration}
                      </Grid>
                    </Grid>
                       <Grid sx={{marginTop: 2}}>
                         <Button variant="outlined" onClick={() => onDelete(elem._id)} startIcon={<DeleteIcon />}>
                         </Button>
                         {elem.isPublished ? null :(
                           <Button variant="outlined" onClick={() => onPublish(elem._id)}  startIcon={<PublishedWithChangesIcon />}>
                           </Button>)}
                       </Grid>
                  </Paper>
                  </Grid>
                )): tracksForUsers.map((elem) => (
                    <Grid item  xs={12} sm={12} md={12} key={elem._id} style={{ marginTop: '20px' }}>
                      <Paper elevation={3} sx={{ padding: '12px'}} >
                        <Grid container>
                          <Grid item xs={2} onClick={() => tracksHistory(elem._id)}>
                            <PlayCircleIcon />
                          </Grid>
                          <Grid item xs={2}  sm={2}  md={2} >
                            {elem.sequence}
                          </Grid>
                          <Grid item xs={6}  sm={6}  md={6}>
                            {elem.name}
                          </Grid>
                          <Grid item xs={2}  sm={2}  md={2}>
                            {elem.duration}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))
                ): <CircularProgress />}
            </Grid>
        </>
    );
};

export default Tracks;