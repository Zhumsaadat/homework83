import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../App/store.ts';
import { TracksTypes } from '../../../types';
import { getTracks } from './trackThunk';


export interface Tracks {
    tracks: TracksTypes[];
    isLoading: boolean;
}

const initialState: Tracks = {
    tracks: [],
    isLoading: false,
};

export const tracksSlice = createSlice({
    name: 'tracks/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTracks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTracks.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.tracks = items;
        });
        builder.addCase(getTracks.rejected, (state) => {
            state.isLoading = false;
        });
    },
});
export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectIsLoading = (state: RootState) => state.tracks.isLoading;