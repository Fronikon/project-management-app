import { createSlice } from '@reduxjs/toolkit';
import { requestArray } from '../../data/requestData';

const initialState: { error: string; isLoading: boolean } = {
  error: '',
  isLoading: false,
};

const sliceErrorAndLoading = createSlice({
  name: 'errorAndLoading',
  initialState,
  reducers: {
    cleanError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    requestArray.map((el) => {
      builder
        .addCase(el.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(el.fulfilled, (state) => {
          state.isLoading = false;
        })
        .addCase(el.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || '';
        });
    });
  },
});

export default sliceErrorAndLoading;

export const { cleanError } = sliceErrorAndLoading.actions;
