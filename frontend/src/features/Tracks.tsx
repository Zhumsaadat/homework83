import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectIsLoading, selectTracks } from '../store/track/trackSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { selectArtists } from '../store/artist/artistSlice';
import { selectAlbums } from '../store/album/albumSlice';
import { selectUser } from '../store/users/usersSlice';
import { getTracks, tracksHistoryPost } from '../store/track/trackThunk';
import { getAlbums } from '../store/album/albumThunk';
import { getArtists } from '../store/artist/artistThunk';

const Tracks = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isLoading = useAppSelector(selectIsLoading);
    const artistName = useAppSelector(selectArtists);
    const albumName = useAppSelector(selectAlbums);
    const user = useAppSelector(selectUser);

    const params = useParams();

    const album = albumName.find(elem => elem._id === params.id);
    const artist = artistName.find(elem => elem._id === album?.artist);

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
            await dispatch(tracksHistoryPost({token: user.token, track: data}));
        }
    };

    return (
        <>
            {album && artist && <Typography variant="h4">Artist: {artist.name}, Album: {album.name}</Typography>}

            <Grid container>
                {!isLoading ? tracks.map((elem) => (
                  <Grid direction='row' xs={12} sm={12} md={12} key={elem._id} style={{ marginTop: '20px' }}>
                     <Paper elevation={3} sx={{ padding: '12px'}} >
                    <Grid container>
                      <Grid xs={2} onClick={() => tracksHistory(elem._id)}>
                        <PlayCircleIcon />
                      </Grid>
                      <Grid xs={2} >
                        {elem.number}
                      </Grid>
                      <Grid xs={6}>
                        {elem.name}
                      </Grid>
                      <Grid xs={2}>
                        {elem.duration}
                      </Grid>
                    </Grid>
                  </Paper>
                  </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default Tracks;