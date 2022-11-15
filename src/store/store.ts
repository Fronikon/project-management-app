import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardReducer';
import languageReducer from './reducers/languageReducer';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    board: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
