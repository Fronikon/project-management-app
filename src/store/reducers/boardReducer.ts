import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumns } from '../../api/columnApi';
import { getColumnTasks } from '../../api/taskApi';

export interface TaskType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  color: string;
  userId: number;
  users: string[];
}

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskType[];
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
    builder
      .addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnType[]>) => {
        state.value = action.payload;
      })
      .addCase(getColumnTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        if (action.payload.length > 0) {
          const column = state.value.find(({ _id }) => _id === action.payload[0].columnId);
          // column?.tasks.push(...action.payload);
          if (column) {
            column.tasks = [...action.payload];
          }
        }
      });
  },
});

export default boardReducer.reducer;

export const { toggleModal, toggleColumn, toggleTask, toggleChange } = boardReducer.actions;
