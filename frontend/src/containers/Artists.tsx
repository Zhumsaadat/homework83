import React, { useCallback, useEffect, useState } from 'react';
import ArtistItem from '../components/ArtistItem';
import { ArtistApi } from '../../types';
import axiosApi from '../axiosApi';
import { Grid } from '@mui/material';

interface Props {
    showAlbums: (id: string) => void;
}
const Artists: React.FC<Props> = ({showAlbums}) => {
    const [artists, setArtist] = useState<ArtistApi[]>([]);
    const [loading, setLoading] = useState(false);


    const fetchArtist = useCallback( async () => {
        try {
            setLoading(true);
            const {data: artist} = await axiosApi.get<ArtistApi[] | null>('/artists');
            if (!artist) {
                setArtist([]);
                return
            }

            setArtist(artist);
        }finally {
            setLoading(false);
        }

    }, []);

    useEffect(()=> {
        void fetchArtist();
    },[fetchArtist]);

    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {artists.map((artist, index) => (
                    <Grid   item xs={4} sm={4} md={4} key={index} style={{ marginTop: '50px' }}>
                        <ArtistItem artist={artist} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Artists;