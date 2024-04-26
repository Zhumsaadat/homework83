import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ArtistApi } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
    artist: ArtistApi;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const clickedArtist = (id) => {
        navigate(`albums?singer=${id}`);
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} onClick={() => clickedArtist(artist._id)}>
                <CardMedia
                    sx={{ height: 140 }}
                    image= {artist.image}
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
    );
};

export default ArtistItem;