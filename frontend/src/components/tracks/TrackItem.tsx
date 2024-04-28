import React from 'react';
import { Grid, Paper } from '@mui/material';
import { TrackApi } from '../../../types';

interface Props {
    track: TrackApi;
    index: number
}

const TrackItem: React.FC<Props> = ({track, index}) => {
    return (
        <Paper elevation={3} sx={{ padding: '12px'}} >
            <Grid container>
                <Grid xs={3} >
                    {index + 1}
                </Grid>
                <Grid xs={6}>
                    {track.name}
                </Grid>
                <Grid xs={2}>
                    {track.duration}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TrackItem;