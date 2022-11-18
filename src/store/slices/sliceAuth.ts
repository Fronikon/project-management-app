import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/authApi';

const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const temp = Object.values(action.payload);
      console.log('temp: ', temp);
      state.token = temp[0];
    });
  },
});

export default sliceAuth;
