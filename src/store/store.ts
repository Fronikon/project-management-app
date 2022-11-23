import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './reducers/languageReducer';
import sliceAuth from './slices/sliceAuth';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    authReducer: sliceAuth.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
