import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../../api/authApi';

const initialState: { error: string } = {
  error: '',
};

const sliceError = createSlice({
  name: 'error',
  initialState,
  reducers: {
    cleanError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload || '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload || '';
      });
  },
});

export default sliceError;

export const { cleanError } = sliceError.actions;
