import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UserPostRequestType, UserPutRequestType, UserResponseType } from '../../types/userTypes';
import UserService from '../../api/userApi';
import { RootState } from '../store';
import { getErrorMessage } from '../../utils/getErrorMessage';

interface UserThunkApiType {
  state: RootState;
  rejectValue: string;
}

interface UserGetArgsType {
  userId: string;
}

export const getUserTAC = createAsyncThunk<UserResponseType, UserGetArgsType, UserThunkApiType>(
  'users/getUser',
  async ({ userId }, { rejectWithValue, getState }) => {
    try {
      const response = await UserService.getUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

export const deleteUserTAC = createAsyncThunk<
  UserResponseType,
  UserPostRequestType,
  UserThunkApiType
>('users/deleteUserById', async ({ userId }, { getState, rejectWithValue }) => {
  try {
    const response = await UserService.deleteUser(userId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});

interface UserChangeArgsType {
  userId: string;
  user: UserPutRequestType;
}

export const changeUserTAC = createAsyncThunk<
  UserResponseType,
  UserChangeArgsType,
  UserThunkApiType
>('users/putUser', async ({ userId, user }, { rejectWithValue, getState }) => {
  try {
    const response = await UserService.changeUser(userId, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});
