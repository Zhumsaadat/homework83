import { useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  Typography
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getArtists } from '../store/artist/artistThunk';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAlbums, selectIsLoading } from '../store/album/albumSlice';
import { getAlbums } from '../store/album/albumThunk';
import { selectArtists } from '../store/artist/artistSlice';


const Albums = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const isLoading = useAppSelector(selectIsLoading);
    const artistName = useAppSelector(selectArtists);

    const params = useParams();

    useEffect(() => {
        const fetchUrl = async () => {
            if (params.id) {
                await dispatch(getAlbums(params.id));
                await dispatch(getArtists());
            }
        };

        void fetchUrl();
    }, [dispatch, params.id]);

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%',
    });

    const artist = artistName.find(elem => elem._id === params.id);

    return (
        <>
            {artist && <Typography variant="h4">{artist.name}</Typography>}
            <Grid container spacing={3} mt={3} alignItems="stretch">
                {!isLoading ? albums.map((elem) => (
                    <Grid item xs={3} key={elem._id}>
                        <RouterLink to={`/tracks/${elem._id}`}>
                            <Card sx={{ maxWidth: 345 }}>
                                {elem.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + elem.image}/> : ''}
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {elem.name}
                                        </Typography>
                                        <Typography component="div">
                                            {'Release: ' + elem.date}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </RouterLink>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default Albums;