import { createSlice } from '@reduxjs/toolkit';

interface TaskType {
  id: number;
  title: string;
  description: string;
  color: string;
}

interface ColumnType {
  id: number;
  description: string;
  column: TaskType[];
}

interface InitialStateType {
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeModalOpen: boolean;
  value: ColumnType[];
}

const initialState: InitialStateType = {
  isModalOpen: false,
  isColumnModalOpen: false,
  isTaskModalOpen: false,
  isChangeModalOpen: false,
  value: [] as ColumnType[],
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
