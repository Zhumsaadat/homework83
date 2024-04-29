import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import { loginUser, newUser } from './usersThunk';
import { GlobalError, UserTypes, ValidationError } from '../../../types';

interface UserState {
    user: UserTypes | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
}

const initialState: UserState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(newUser.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(newUser.fulfilled, (state, {payload: data}) => {
            state.registerLoading = false;
            state.user = data.user;
        });
        builder.addCase(newUser.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(loginUser.fulfilled, (state, {payload: data}) => {
            state.loginLoading = false;
            state.user = data.user;
        });
        builder.addCase(loginUser.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    },
});

export const usersReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;