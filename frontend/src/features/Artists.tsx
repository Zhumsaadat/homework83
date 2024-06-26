import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { deleteArtist, getArtists, publishArtist } from '../store/artist/artistThunk';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectArtists, selectIsLoading } from '../store/artist/artistSlice';
import { selectUser } from '../store/users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);

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

  const artistForUsers = artists.filter(artist => artist.isPublished);

  const onDelete = async (id: string) => {
    if(user.role !== "admin"){
      alert('You do not have the right to delete!');
    }
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(deleteArtist(id));
      }
    };

  const onPublish = async (id: string) => {
    if(user.role !== "admin"){
      alert('You do not have the right to delete!');
    }
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(publishArtist(id));
      await dispatch(getArtists);
    }
  };


  return (
        <>
            <Grid container spacing={3} mt={3}>
                {!isLoading ? (
                  user?.role === "admin"  && user ? artists.map((elem) => (
                    <Grid item xs={3} key={elem._id} >
                            <Card sx={{position: 'relative', maxWidth: 345 }}>
                              {elem.isPublished ? null : (
                                <Alert variant="filled" severity="error" sx={{ position: 'absolute', top: 0, right: 0 , zIndex: 1}}>
                                  не опубликовано
                                </Alert>
                              )}
                              <RouterLink to={`/albums/${elem._id}`}>
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
                              </RouterLink>
                              <Grid sx={{marginTop: 2}}>
                                <Button variant="outlined" onClick={() => onDelete(elem._id)}  startIcon={<DeleteIcon   />}>
                                  Delete
                                </Button>
                                {elem.isPublished ? null :(
                                  <Button variant="outlined" onClick={() => onPublish(elem._id)} startIcon={<PublishedWithChangesIcon />}>
                                    Publish
                                  </Button>)}
                              </Grid>
                            </Card>

                    </Grid>
                )) :  artistForUsers.map((elem) => (
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
                  ))
                ):  <CircularProgress />}
            </Grid>
        </>
    );
};

export default Artists;