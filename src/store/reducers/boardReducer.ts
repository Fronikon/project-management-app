import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumns } from '../../api/columnApi';
import { getColumnTasks } from '../../api/taskApi';

export interface TaskType {
  title: string;
  order: number;
  columnId: string;
  description: string;
  color: string;
  userId: number;
  users: string[];
  boardId?: string;
  _id?: string;
}

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

interface InitialStateType {
  columnId: string;
  taskId: string;
  columnLength: number;
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeModalOpen: boolean;
  value: ColumnType[];
  tasks: { [index: string]: TaskType[] };
}

const initialState: InitialStateType = {
  columnId: '',
  taskId: '',
  columnLength: 0,
  isModalOpen: false,
  isColumnModalOpen: false,
  isTaskModalOpen: false,
  isChangeModalOpen: false,
  value: [] as ColumnType[],
  tasks: {},
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
    setColumns(state, action) {
      state.value = action.payload;
    },
    setTasks(state, action) {
      state.tasks[action.payload.id] = action.payload.items;
    },
    increaseColumnCount(state) {
      state.columnLength += 1;
    },
    decreaseColumnCount(state) {
      state.columnLength -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnType[]>) => {
        state.value = action.payload;
        state.value = state.value.sort((a, b) => a.order - b.order);
        state.columnLength = state.value.length;
      })
      .addCase(getColumnTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        if (action.payload.length > 0) {
          state.tasks[action.payload[0].columnId] = action.payload.sort(
            (a, b) => a.order - b.order
          );
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
  setColumns,
  increaseColumnCount,
  decreaseColumnCount,
  setTasks,
} = boardReducer.actions;
