import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './reducers/boardsReducer';
import languageReducer from './reducers/languageReducer';
import sliceAuth from './slices/sliceAuth';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    authReducer: sliceAuth.reducer,
    boardsReducer: boardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
