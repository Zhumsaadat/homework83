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
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getArtists } from '../store/artist/artistThunk';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectArtists, selectIsLoading } from '../store/artist/artistSlice';


const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getArtists());
        };

        void fetchUrl();
    }, [dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%',
    });

    return (
        <>
            <Grid container spacing={3} mt={3}>
                {!isLoading ? artists.map((elem) => (
                    <Grid item xs={3} key={elem._id}>
                        <RouterLink to={`/albums/${elem._id}`}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    {elem.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + elem.image}/> : ''}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {elem.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component='p'>
                                            {elem.info}
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

export default Artists;