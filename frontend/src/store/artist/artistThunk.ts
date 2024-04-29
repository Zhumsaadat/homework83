import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ArtistsTypes } from '../../../types';

export const getArtists = createAsyncThunk<ArtistsTypes[]>(
    'artists/get',
    async () => {
        const response = await axiosApi.get<ArtistsTypes[]>('/artists');
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);