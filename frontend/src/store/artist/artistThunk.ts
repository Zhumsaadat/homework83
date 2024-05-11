import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ArtistsMutation, ArtistsTypes } from '../../../types';
import { RootState } from '../../app/store';

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

export const createArtist = createAsyncThunk<void, ArtistsMutation, {state: RootState}>(
  'artist/create',
  async (artist, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      };
      await axiosApi.post<ArtistsMutation>('/artists', artist, {headers});
    }catch (e) {
      throw e;
    }
  },
);

export const deleteArtist = createAsyncThunk<void, string, {state: RootState}>(
  'artist/delete',
  async (id, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axiosApi.delete(`/artists/${id}`, {headers});
      thunkApi.dispatch(getArtists());
    }catch (e) {
      throw e;
    }
  },
);

export const publishArtist = createAsyncThunk(
  'artist/publishTrack',
  async (id: string, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await axiosApi.patch(`/artists/${id}/togglePublished`, { isPublished: true }, {headers});
      return response.data;
    }catch (e) {
      throw e;
    }
  }
);