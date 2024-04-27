import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { Container, Grid } from '@mui/material';
import AlbumItem from '../components/AlbumItems';
import Spinner from '../components/Spinner';

const Albums = () => {
    const [albumsState, setAlbumsState] = useState([]);
    const [loading, setLoading] = useState(false);
    let url = '';

    const queryString = window.location.search;
    if(queryString) {
        const urlParams = new URLSearchParams(queryString);
        const singerId = urlParams.get('singer');
        url = `/albums?singer=${singerId}`;
    } else {
        url ='/albums';
    }

    const fetchAlbums = useCallback(async (url) => {
        try {
            setLoading(true);
            const { data: albums } = await axiosApi.get(url);
            setAlbumsState(albums);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching albums:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchAlbums(url);
    }, [fetchAlbums, url]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <Grid container spacing={2} >
                        {albumsState.map((album, index) => (
                            <Grid item xs={4} sm={4} md={4} key={index} style={{ marginTop: '20px' }}>
                                <AlbumItem album={album} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </>
    );
};

export default Albums;
