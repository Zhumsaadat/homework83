import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { Grid } from '@mui/material';
import TrackItem from '../components/tracks/TrackItem';
import Spinner from '../components/Spinner';


const Tracks = () => {
    const [tracksState, setTracksState] = useState([]);
    const [loading, setLoading] = useState(false);
    let url = '';

    const queryString = window.location.search;
    if(queryString) {
        const urlParams = new URLSearchParams(queryString);
        const albumId = urlParams.get('album');
        url = `/tracks?album=${albumId}`;
    } else {
        url ='/tracks';
    }


    const fetchTracks = useCallback(async (url: string) => {
        try {
            setLoading(true);
            const {data: tracks} = await axiosApi.get(url);
            if (tracks) {
                await setTracksState(tracks);
            } else {
                console.log('no')
            }
        } catch (e){
            setLoading(false);
            console.log(e);
        }finally {
            setLoading(false);
        }

    }, []);



    useEffect(() => {
        void fetchTracks(url);
    }, [fetchTracks]);

    return ( loading? (
        <Spinner/>

        ): (
            <>
                <Grid container >
                    {tracksState.map((track, index) => (
                        <Grid direction='row' xs={12} sm={12} md={12} key={index} style={{ marginTop: '20px' }}>
                            <TrackItem track={track} index={index} style={{ margin: '15px' }} />
                        </Grid>
                    ))}
                </Grid>
            </>
        )

    );
};

export default Tracks;