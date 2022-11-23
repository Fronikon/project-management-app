import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumns } from '../../api/columnApi';
import { getColumnTasks } from '../../api/taskApi';

export interface TaskType {
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  color: string;
  userId: number;
  users: string[];
  _id?: string;
}

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskType[];
}

interface InitialStateType {
  columnId: string;
  taskId: string;
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeModalOpen: boolean;
  value: ColumnType[];
}

const initialState: InitialStateType = {
  columnId: '',
  taskId: '',
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
    setCurrentColumnId(state, action) {
      state.columnId = action.payload;
    },
    resetColumnId(state) {
      state.columnId = '';
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
          if (column) {
            column.tasks = [...action.payload];
          }
        }
      });
  },
});

export default boardReducer.reducer;

export const {
  toggleModal,
  toggleColumn,
  toggleTask,
  toggleChange,
  setCurrentColumnId,
  resetColumnId,
} = boardReducer.actions;
