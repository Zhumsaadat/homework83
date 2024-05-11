import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../App/store.ts';
import { AlbumsTypes } from '../../../types';
import { createAlbum, deleteAlbum, getAlbums } from './albumThunk';

export interface Albums {
    albums: AlbumsTypes[];
    isLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: Albums = {
    albums: [],
    isLoading: false,
    createLoading: false,
    deleteLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.albums = items;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.isLoading = false;
    });

        builder.addCase(createAlbum.pending, (state) => {
          state.createLoading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state) => {
          state.createLoading = false;
        });
        builder.addCase(createAlbum.rejected, (state) => {
         state.createLoading = false;
        });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = false;
    });
    },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectIsLoading = (state: RootState) => state.albums.isLoading;
export const selectCreateLoading = (state: RootState) => state.albums.createLoading;
export const deleteCreateLoading = (state: RootState) => state.albums.deleteLoading;