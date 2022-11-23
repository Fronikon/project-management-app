import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/authApi';

const initialState: { token: string } = {
  token: localStorage.getItem('token') || '',
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const temp = Object.values(action.payload);
      state.token = temp[0];
    });
  },
});

export default sliceAuth;
