import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserPostRequestType, UserPutRequestType, UserResponseType } from '../../types/userTypes';
import UserService from '../../api/userApi';
import textData from '../../data/textData';
import { RootState } from '../store';

interface UserThunkApiType {
  state: RootState;
  rejectValue: string;
}

interface UserGetArgsType {
  userId: string;
  token: string;
}

export const getUserTAC = createAsyncThunk<UserResponseType, UserGetArgsType, UserThunkApiType>(
  'users/getUser',
  async ({ userId, token }, { rejectWithValue, getState }) => {
    const language = getState().language.value;

    try {
      const response = await UserService.getUser(userId, token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrors = textData.serverErrors;
        const { userNotFound, otherError } = serverErrors;

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 404) {
            return rejectWithValue(userNotFound[language]);
          }
        }

        return rejectWithValue(otherError[language]);
      }
    }
  }
);

export const deleteUserTAC = createAsyncThunk<
  UserResponseType,
  UserPostRequestType,
  UserThunkApiType
>('users/deleteUserById', async ({ userId, token }, { getState, rejectWithValue }) => {
  const language = getState().language.value;
  try {
    const response = await UserService.deleteUser(userId, token);
    return response.data;
  } catch (error) {
    return rejectWithValue(textData.serverErrors.otherError[language]);
  }
});

interface UserChangeArgsType {
  userId: string;
  user: UserPutRequestType;
  token: string;
}

export const changeUserTAC = createAsyncThunk<
  UserResponseType,
  UserChangeArgsType,
  UserThunkApiType
>('users/putUser', async ({ userId, token, user }, { rejectWithValue, getState }) => {
  const language = getState().language.value;

  try {
    const response = await UserService.changeUser(userId, user, token);
    return response.data;
  } catch (error) {
    const serverErrors = textData.serverErrors;
    const { loginAlready, otherError } = serverErrors;

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 409) {
        return rejectWithValue(loginAlready[language]);
      }
    }

    return rejectWithValue(otherError[language]);
  }
});
