import { AlbumApi, ArtistApi } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumState {
    artist: ArtistApi | null;
    albumList: AlbumApi[];
    albumLoading: boolean;
}

const initialState: AlbumState = {
    artist: null,
    albumList: [],
    albumLoading: false,
};

const AlbumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {}
})