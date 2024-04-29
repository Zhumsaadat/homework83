import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import { ArtistsTypes } from '../../../types';
import { getArtists } from './artistThunk';

export interface ArtistsData {
    artists: ArtistsTypes[];
    isLoading: boolean;
}

const initialState: ArtistsData = {
    artists: [],
    isLoading: false,
};

export const artistsSlice = createSlice({
    name: 'artists/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getArtists.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getArtists.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.artists = items;
        });
        builder.addCase(getArtists.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;