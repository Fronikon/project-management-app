import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInType } from '../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../components/Main/components/SignUp/SignUp';

import { instance } from './instance';

export const signIn = createAsyncThunk<string, SignInType, { rejectValue: string }>(
  'auth/signin',
  async (user, { rejectWithValue }) => {
    const response = await instance.post('auth/signin', user);
    if (response.status !== 200) {
      return rejectWithValue('Server error!');
    }

    return await response.data;
  }
);

interface SignUpResponseType {
  name: string;
  login: string;
  _id: string;
}

export const signUp = createAsyncThunk<SignUpResponseType, SignUpType, { rejectValue: string }>(
  'auth/signup',
  async (user, { rejectWithValue }) => {
    const response = await instance.post('auth/signup', user);
    if (response.status !== 200) {
      return rejectWithValue('Server error!');
    }

    return await response.data;
  }
);
