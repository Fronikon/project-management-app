import { createSlice } from '@reduxjs/toolkit';

interface TaskArrayType {
  title: string;
  description: string;
  color: string;
}

interface ColumnArrayType {
  description: string;
  column: TaskArrayType[];
}

interface InitialStateType {
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeModalOpen: boolean;
  value: ColumnArrayType[];
}

const initialState: InitialStateType = {
  isModalOpen: true,
  isColumnModalOpen: false,
  isTaskModalOpen: true,
  isChangeModalOpen: false,
  value: [] as ColumnArrayType[],
};

const boardReducer = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addColumn(state, action) {
      state.value.push(action.payload);
    },
    addTask(state, action) {
      state.value.push(action.payload);
    },
    openModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    openColumn(state) {
      state.isColumnModalOpen = !state.isColumnModalOpen;
    },
    openTask(state) {
      state.isTaskModalOpen = !state.isTaskModalOpen;
    },
    openChange(state) {
      state.isChangeModalOpen = !state.isChangeModalOpen;
    },
  },
});

export default boardReducer.reducer;

export const { addColumn, addTask, openModal, openColumn, openTask, openChange } =
  boardReducer.actions;
