import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ArtistApi } from '../../types';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axiosApi from '../axiosApi';
import imageNotAvailable from '../assets/imageNotAvailable.png'

interface Props {
    artist: ArtistApi;
}


const ArtistItem: React.FC<Props> = ({artist}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let cardImage = imageNotAvailable;

    if(artist.image) {
        cardImage = `http://localhost:8000/${artist.image}`;
    }

    const clickedArtist = async (id) => {
        try {
            setLoading(true)
            const { data: albums } = await axiosApi.get(`albums?singer=${id}`);
            if(albums){
                navigate(`/albums?singer=${id}`);
            } else {
                navigate('<h2>Not tracks</h2>')
            }
        }catch (e){
            setLoading(false);
            console.log(e)
        }finally {
           setLoading(false);
        }

    };


    return (
        loading? (
            <Spinner/>
    ):(
        <div>
                <Card sx={{ maxWidth: 345 }} onClick={() => clickedArtist(artist._id)}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image= {cardImage}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {artist.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {artist.info}
                        </Typography>
                    </CardContent>
                </Card>
            </div>

    )
    )
};

export default ArtistItem;