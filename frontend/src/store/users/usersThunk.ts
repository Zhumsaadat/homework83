import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError } from '../../../types';

export const newUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/users', registerMutation);
            return response.data;
        } catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 422) {
                return rejectWithValue(err.response.data);
            }

            throw err;
        }
    }
);

export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);
            return response.data;
        } catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 422) {
                return rejectWithValue(err.response.data);
            }

            throw err;
        }
    },
);