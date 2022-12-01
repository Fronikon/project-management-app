import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import textData from '../data/textData';
import { RootState } from '../store/store';
import { instance } from './instance';

interface UserRequestType {
  userId: string;
  token: string;
}

interface UserResponseType {
  login: string;
  name: string;
  _id: string;
}

export const getUser = createAsyncThunk<
  UserResponseType,
  UserRequestType,
  { state: RootState; rejectValue: string }
>('users/getUser', async ({ userId, token }, thunkAPI) => {
  const language = thunkAPI.getState().language.value;
  try {
    const response = await instance.get(`users/${userId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 409) {
        const message = textData.serverErrors.loginAlreadyExist[language];
        return thunkAPI.rejectWithValue(message);
      } else {
        const message = textData.serverErrors.otherError[language];
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
});

export const deleteUserById = createAsyncThunk<
  UserResponseType,
  UserRequestType,
  { state: RootState; rejectValue: string }
>('users/deleteUserById', async ({ userId, token }, thunkAPI) => {
  const language = thunkAPI.getState().language.value;
  try {
    const response = await instance.delete(`users/${userId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 200) {
        const message = textData.serverErrors.otherError[language];
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
});

interface UserPutRequestType {
  userId: string;
  token: string;
  user: {
    name: string;
    login: string;
    password: string;
  };
}

export const putUser = createAsyncThunk<
  UserResponseType,
  UserPutRequestType,
  { state: RootState; rejectValue: string }
>('users/putUser', async ({ userId, token, user }, thunkAPI) => {
  const language = thunkAPI.getState().language.value;
  try {
    const response = await instance.put(`users/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 409) {
        const message = textData.serverErrors.loginAlreadyExist[language];
        return thunkAPI.rejectWithValue(message);
      } else {
        const message = textData.serverErrors.otherError[language];
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
});
