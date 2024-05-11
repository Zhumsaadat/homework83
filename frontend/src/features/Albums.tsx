import React, { useEffect } from 'react';
import {
  Alert, Button,
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
import { deleteAlbum, getAlbums } from '../store/album/albumThunk';
import { selectArtists } from '../store/artist/artistSlice';
import { selectUser } from '../store/users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


const Albums = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectIsLoading);
    const artistName = useAppSelector(selectArtists);
    const params = useParams();

  const albumsForUsers = albums.filter(album => album.isPublished);


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

  const onDelete = async (id: string) => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(deleteAlbum(id));
      if(params.id) {
        await dispatch(getAlbums(params.id));
      }
    }
  };

  return (
        <>
          {artist && <Typography variant="h4">{artist.name}</Typography>}
          <Grid container spacing={3} mt={3} alignItems="stretch">
            {!isLoading ? (
              user && user.role === "admin" ? albums.map((elem) => (
                <Grid item xs={3} key={elem._id}>
                    <Card sx={{position: 'relative', maxWidth: 345 }}>
                      {elem.isPublished ? null : (
                        <Alert variant="filled" severity="error" sx={{ position: 'absolute', top: 0, right: 0 }}>
                          не опубликовано
                        </Alert>
                      )}
                      <RouterLink to={`/tracks/${elem._id}`}>
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
                      </RouterLink>
                      <Grid sx={{marginTop: 2}}>
                        <Button variant="outlined" onClick={() => onDelete(elem._id)}  startIcon={<DeleteIcon   />}>
                          Delete
                        </Button>
                        {elem.isPublished ? null :(
                          <Button variant="outlined" startIcon={<PublishedWithChangesIcon />}>
                            Publish
                          </Button>)}
                      </Grid>
                    </Card>
                </Grid>
              )) : albumsForUsers.map((elem) => (
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
              ))
            ) : <CircularProgress />}
          </Grid>
        </>
    );
};

export default Albums;
