import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../App/store.ts';
import { ArtistsTypes } from '../../../types';
import { createArtist, deleteArtist, getArtists, publishArtist } from './artistThunk';

export interface ArtistsData {
    artists: ArtistsTypes[];
    isLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
    publishLoading: boolean;
}

const initialState: ArtistsData = {
    artists: [],
    isLoading: false,
    createLoading: false,
    deleteLoading: false,
    publishLoading: false,
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

      builder.addCase(createArtist.pending, (state) => {
        state.createLoading = true;
      });
      builder.addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      });
      builder.addCase(createArtist.rejected, (state) => {
        state.createLoading = false
      });

      builder.addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
      });
      builder.addCase(deleteArtist.fulfilled, (state) => {
        state.deleteeLoading = false;
      });
      builder.addCase(deleteArtist.rejected, (state) => {
        state.deleteLoading = false;
      });

      builder.addCase(publishArtist.pending, (state) => {
        state.publishLoading = true;
      });
      builder.addCase(publishArtist.fulfilled, (state) => {
        state.publishLoading = false;
      });
      builder.addCase(publishArtist.rejected, (state) => {
        state.publishLoading = false;
      });
    },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;
export const selectCreateLoading = (state: RootState) => state.artist.createLoading;
export const deleteCreateLoading = (state: RootState) => state.artist.deleteLoading;
export const publishCreateLoading = (state: RootState) => state.artist.publishLoading;
