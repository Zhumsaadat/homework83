import {CircularProgress, Grid, Typography} from '@mui/material';
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import { getArtists } from '../artist/artistThunk';
import { getTracksHistory } from './trackThunk';
import { selectUser } from '../users/usersSlice';
import { selectHistory, selectHistoryLoading } from './tracksHistorySlice';
import {format} from 'date-fns';

const TracksHistory = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const historyLoading = useAppSelector(selectHistoryLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchUrl = async () => {
      if (user) {
        await dispatch(getTracksHistory(user.token));
        await dispatch(getArtists());
      } else {
        navigate('/register');
      }
    };

    void fetchUrl();
  }, [dispatch]);

  const sortedHistory = history.slice().sort((date, time) => time.datetime.localeCompare(date.datetime));
  return (
    <>
      <Grid container sx={{flexDirection: 'column', alignItems: 'center', gap: 3}}>
        {!historyLoading ? sortedHistory.map((elem) => (
          <Grid item key={elem._id} sx={{border: 1, width: '60%', p: 2}}>
            <Typography>
              Date: {format(elem.datetime, 'yyyy-MM-dd HH:mm')}
            </Typography>
            <Typography>

            </Typography>
            <Typography>
              {elem.track.name}
            </Typography>
          </Grid>
        )) : <CircularProgress />}
      </Grid>
    </>
  );
};

export default TracksHistory;