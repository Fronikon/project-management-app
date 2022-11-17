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
  isModalOpen: false,
  isColumnModalOpen: false,
  isTaskModalOpen: false,
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
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleColumn(state) {
      state.isColumnModalOpen = !state.isColumnModalOpen;
    },
    toggleTask(state) {
      state.isTaskModalOpen = !state.isTaskModalOpen;
    },
    toggleChange(state) {
      state.isChangeModalOpen = !state.isChangeModalOpen;
    },
  },
});

export default boardReducer.reducer;

export const { addColumn, addTask, toggleModal, toggleColumn, toggleTask, toggleChange } =
  boardReducer.actions;
