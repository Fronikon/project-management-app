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

const languageSlice = createSlice({
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

export default languageSlice.reducer;

export const { switchRu, switchEng } = languageSlice.actions;
