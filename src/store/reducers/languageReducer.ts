import { createSlice } from '@reduxjs/toolkit';
import { InitialStateType } from '../../types/languageTypes';

const getLanguage = () => {
  const language = localStorage.getItem('language');
  if (language === 'ru' || language === 'eng') {
    return language;
  }
};

const initialState: InitialStateType = {
  value: getLanguage() || 'eng',
};

const languageReducer = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchRu(state) {
      state.value = 'ru';
    },
    switchEng(state) {
      state.value = 'eng';
    },
  },
});

export default languageReducer.reducer;

export const { switchRu, switchEng } = languageReducer.actions;
