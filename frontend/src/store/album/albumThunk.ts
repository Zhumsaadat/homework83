import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AlbumsTypes } from '../../../types';

export const getAlbums = createAsyncThunk<AlbumsTypes[], string>(
    'albums/get',
    async (id) => {
        const response = await axiosApi.get<AlbumsTypes[]>(`/albums?singer=${id}`);
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);