import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import { getTracksHistory } from './trackThunk';

interface TrackHistory {
  historyLoading: boolean;
  history: History[];
}

const initialState: TrackHistory = {
  historyLoading: false,
  history: [],
};

export const tracksHistorySlice = createSlice({
  name: 'history/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracksHistory.pending, (state) => {
      state.historyLoading = true;
    });
    builder.addCase(getTracksHistory.fulfilled, (state, {payload: items}) => {
      state.historyLoading = false;
      state.history = items;
    });
    builder.addCase(getTracksHistory.rejected, (state) => {
      state.historyLoading = false;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectHistory = (state: RootState) => state.tracksHistory.history;
export const selectHistoryLoading = (state: RootState) => state.tracksHistory.historyLoading;