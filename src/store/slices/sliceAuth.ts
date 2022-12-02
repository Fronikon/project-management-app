import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/authApi';
import { parseJwt } from '../../data/parseJWT';

const initialState: { token: string; userId: string } = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || '',
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.token = '';
      localStorage.removeItem('token');
      state.userId = '';
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const temp = Object.values(action.payload);
      state.token = temp[0];
      state.userId = parseJwt(temp[0]).id;
    });
  },
});

export default sliceAuth;

export const { logOut } = sliceAuth.actions;
