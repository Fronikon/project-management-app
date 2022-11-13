import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './reducers/languageReducer';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
