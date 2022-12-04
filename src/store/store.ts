import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardReducer';
import boardsReducer from './reducers/boardsReducer';
import languageReducer from './reducers/languageReducer';
import errorAndLoadingReducer from './reducers/errorAndLoadingReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    authReducer: authReducer,
    errorAndLoadingReducer: errorAndLoadingReducer,
    boardsReducer: boardsReducer,
    boardReducer: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
