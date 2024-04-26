import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { Grid } from '@mui/material';
import AlbumItem from '../components/AlbumItems';


const Albums = () => {
    const [albumsState, setAlbumsState] = useState([]);
    let url = '';

    const queryString = window.location.search;
    if(queryString) {
        const urlParams = new URLSearchParams(queryString);
        const singerId = urlParams.get('singer');
        url = `/albums?singer=${singerId}`;
    } else {
        url ='/albums';
    };


    const fetchAlbums = useCallback(async (url: string) => {
        const {data: albums} = await axiosApi.get(url);
        if (albums) {
            await setAlbumsState(albums);
            console.log('no albums')
        }
    }, []);



   useEffect(() => {
      void fetchAlbums(url);
       console.log(albumsState)
   }, [fetchAlbums]);
    console.log(albumsState)


    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {albumsState.map((album, index) => (
                    <Grid   item xs={4} sm={4} md={4} key={index} style={{ marginTop: '50px' }}>
                        <AlbumItem album={album} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Albums;