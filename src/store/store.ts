import { configureStore } from '@reduxjs/toolkit';
import languageSlice from './reducers/languageReducer';

export const store = configureStore({
  reducer: {
    language: languageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
