import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tracksHistoryReducer } from '../store/track/tracksHistorySlice';
import { usersReducer } from '../store/users/usersSlice';
import { artistsReducer } from '../store/artist/artistSlice';
import { albumsReducer } from '../store/album/albumSlice';
import { tracksReducer } from '../store/track/trackSlice';


const usersPersistConfig = {
  key: 'music:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  tracksHistory: tracksHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;