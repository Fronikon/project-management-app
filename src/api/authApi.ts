import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SignInType } from '../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../components/Main/components/SignUp/SignUp';
import textData from '../data/textData';
import { instance } from './instance';

export const signIn = createAsyncThunk<string, SignInType, { rejectValue: string }>(
  'auth/signin',
  async (user, thunkAPI) => {
    const state = JSON.stringify(thunkAPI.getState());
    const language: 'ru' | 'eng' = JSON.parse(state).language.value;
    try {
      const response = await instance.post('auth/signin', user);
      localStorage.setItem('token', response.data.token);
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          const message = textData.serverErrors.wrongLoginOrPassword[language];
          return thunkAPI.rejectWithValue(message);
        } else {
          const message = textData.serverErrors.otherError[language];
          return thunkAPI.rejectWithValue(message);
        }
      }
    }
  }
);

interface SignUpResponseType {
  name: string;
  login: string;
  _id: string;
}

export const signUp = createAsyncThunk<SignUpResponseType, SignUpType, { rejectValue: string }>(
  'auth/signup',
  async (user, thunkAPI) => {
    const state = JSON.stringify(thunkAPI.getState());
    const language: 'ru' | 'eng' = JSON.parse(state).language.value;
    try {
      const response = await instance.post('auth/signup', user);
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          const message = textData.serverErrors.loginAlready[language];
          return thunkAPI.rejectWithValue(message);
        } else {
          const message = textData.serverErrors.otherError[language];
          return thunkAPI.rejectWithValue(message);
        }
      }
    }
  }
);
