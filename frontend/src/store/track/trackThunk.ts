import { createAsyncThunk } from '@reduxjs/toolkit';
import { History, tracksHistoryTypes, TracksMutation, TracksTypes } from '../../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store';

export const getTracks = createAsyncThunk<TracksTypes[], string>(
    'tracks/get',
    async (id) => {
        const response = await axiosApi.get<TracksTypes[]>(`/tracks?album=${id}`);
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);

export const tracksHistoryPost = createAsyncThunk<void, tracksHistoryTypes>(
    'tracks/history',
    async (data) => {
        try {
            const headers = {
                'Authorization': `Bearer ${data.token}`,
            };
            await axiosApi.post<tracksHistoryTypes>('/track_history', {track: data.track}, {headers});
        } catch (err) {
            throw err;
        }
    },
);

export const getTracksHistory = createAsyncThunk<History[], string>(
    'get/history',
    async (token) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axiosApi.get<History[]>('/track_history', {headers});
            const items = response.data;

            if (!items) {
                return [];
            }

            return items;
        } catch (err) {
            throw err;
        }
    },
);

export const createTrack = createAsyncThunk<void, TracksMutation, {state: RootState}>(
  'tracks/create',
  async (track, thunkApi) => {
    try{
      const token = thunkApi.getState().users.user?.token;

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await axiosApi.post<TracksMutation>('/tracks', track, {headers});
    }catch (e) {
      throw e;
    }
  },
);