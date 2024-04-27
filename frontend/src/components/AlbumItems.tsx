import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { AlbumApi } from '../../types';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axiosApi from '../axiosApi';


interface Props {
    album: AlbumApi;
}

const AlbumItem: React.FC<Props> = ({album}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const clickedAlbum = async (id) => {
        try{
            setLoading(true);
            const { data: tracks } = await axiosApi.get(`/tracks?album=${id}`);
            if(tracks.length){
                navigate(`/tracks?album=${id}`);
            } else {
                navigate('<h2>Not tracks</h2>')
            }
        } catch (e){
            setLoading(false);
            console.log(e);
        } finally {
            setLoading(false);
        }


    };


    return ( loading? (
          <Spinner/>
        ): (
            <div>
                <Card sx={{ maxWidth: 345 }} onClick={() => clickedAlbum(album._id)}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={album.image}
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
        )

    );
};

export default AlbumItem;