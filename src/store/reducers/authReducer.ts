import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../api/authApi';
import TokenService from '../../api/tokenApi';
import { SignInType } from '../../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../../components/Main/components/SignUp/SignUp';
import { parseJwt } from '../../utils/parseJWT';
import textData from '../../data/textData';
import { RootState } from '../store';

export interface SignInThunkApiType {
  state: RootState;
  rejectValue: string;
}

export const signInTAC = createAsyncThunk<string, SignInType, SignInThunkApiType>(
  'auth/signin',
  async (user, { getState, rejectWithValue }) => {
    const language = getState().language.value;
    try {
      const response = await AuthService.signIn(user);
      const { data } = response;
      const { token } = data;

      TokenService.setToken(token);
      TokenService.setUser(parseJwt(token).id);

      return data;
    } catch (error) {
      const serverErrors = textData.serverErrors;
      const { wrongLoginOrPassword, otherError } = serverErrors;

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          return rejectWithValue(wrongLoginOrPassword[language]);
        }
      }

      return rejectWithValue(otherError[language]);
    }
  }
);

interface SignUpResponseType {
  name: string;
  login: string;
  _id: string;
}

interface SignUpArgsType {
  state: RootState;
  rejectValue: string;
}

export const signUpTAC = createAsyncThunk<SignUpResponseType, SignUpType, SignUpArgsType>(
  'auth/signup',
  async (user, { getState, rejectWithValue }) => {
    const language = getState().language.value;
    try {
      const response = await AuthService.signUp(user);
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
  }
);

interface InitialStateType {
  token: string;
  userId: string;
}
const initialState: InitialStateType = {
  token: TokenService.getToken() || '',
  userId: TokenService.getUser() || '',
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.token = '';
      TokenService.removeToken();

      state.userId = '';
      TokenService.removeUser();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInTAC.fulfilled, (state, action) => {
      const temp = Object.values(action.payload);
      state.token = temp[0];
      state.userId = parseJwt(temp[0]).id;
    });
  },
});

export const { logOut } = sliceAuth.actions;
export default sliceAuth.reducer;
