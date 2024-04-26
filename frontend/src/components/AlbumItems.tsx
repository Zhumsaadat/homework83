import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { AlbumApi } from '../../types';
import { useNavigate } from 'react-router-dom';


interface Props {
    album: AlbumApi;
}

const AlbumItem: React.FC<Props> = ({album}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const clickedArtist = (id) => {
        navigate(`albums?singer=${id}`);
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} onClick={() => clickedArtist(album._id)}>
                <CardMedia
                    sx={{ height: 140 }}
                    image= {album.image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {album.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {album.singer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {album.date}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default AlbumItem;