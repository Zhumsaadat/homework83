import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AlbumMutation, AlbumsTypes } from '../../../types';
import { RootState } from '../../app/store';

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

export const createAlbum = createAsyncThunk<void, AlbumMutation, {state: RootState}>(
  'albums/create',
  async (album, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      };
      await axiosApi.post<AlbumMutation>('/albums', album, {headers});
    }catch (e) {
      throw e;
    }
  },
);

export const deleteAlbum = createAsyncThunk<void, string, {state: RootState}>(
  'album/delete',
  async (id, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await axiosApi.delete(`/albums/${id}`, {headers});
    }catch (e) {
      throw e;
    }
  },
);