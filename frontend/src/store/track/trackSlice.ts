import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../App/store.ts';
import { TracksTypes } from '../../../types';
import { createTrack, deleteTrack, getTracks } from './trackThunk';


export interface Tracks {
    tracks: TracksTypes[];
    isLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: Tracks = {
    tracks: [],
    isLoading: false,
    createLoading: false,
    deleteLoading: false,
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

      builder.addCase(createTrack.pending, (state) => {
        state.createLoading = true;
      });
      builder.addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      });
      builder.addCase(createTrack.rejected, (state) => {
        state.createLoading = false;
      });

      builder.addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      });
      builder.addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      });
      builder.addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      });
    },
});
export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectIsLoading = (state: RootState) => state.tracks.isLoading;
export const selectCreateLoading = (state: RootState) => state.tracks.createLoading;
export const selectDeleteLoading = (state: RootState) => state.tracks.deleteLoading;