import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumns } from '../../api/columnApi';

interface TaskType {
  id: number;
  title: string;
  description: string;
  color: string;
}

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
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
  extraReducers: (builder) => {
    builder.addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnType[]>) => {
      state.value = action.payload;
    });
  },
});

export default boardReducer.reducer;

export const { toggleModal, toggleColumn, toggleTask, toggleChange } = boardReducer.actions;
