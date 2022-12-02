import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn, deleteColumn, getAllColumns } from '../../api/columnApi';
import { createTask, deleteTask, getColumnTasks } from '../../api/taskApi';

export interface TaskType {
  title: string;
  order: number;
  columnId: string;
  description: string;
  color: string;
  userId: string;
  users: string[];
  boardId: string;
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
  tasksLength: { [index: string]: number };
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeModalOpen: boolean;
  columns: ColumnType[];
  tasks: { [index: string]: TaskType[] };
}

const initialState: InitialStateType = {
  columnId: '',
  taskId: '',
  columnLength: 0,
  tasksLength: {},
  isModalOpen: false,
  isColumnModalOpen: false,
  isTaskModalOpen: false,
  isChangeModalOpen: false,
  columns: [] as ColumnType[],
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
      state.columns = action.payload;
    },
    setTasks(state, action) {
      state.tasks[action.payload.id] = action.payload.items;
    },
    zeroingTasks(state, action) {
      state.tasks[action.payload] = [];
    },
    increaseColumnCount(state) {
      state.columnLength += 1;
    },
    decreaseColumnCount(state) {
      state.columnLength -= 1;
    },
    increaseTasksCount(state, action) {
      state.tasksLength[action.payload] += 1;
    },
    decreaseTasksCount(state, action) {
      state.tasksLength[action.payload] -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnType[]>) => {
        state.columns = action.payload;
        state.columns = state.columns.sort((a, b) => a.order - b.order);
        state.columnLength = state.columns.length;
        for (let i = 0; i < state.columns.length; i++) {
          state.tasks[state.columns[i]._id] = [];
          state.tasksLength[action.payload[i]._id] = 0;
        }
        console.log(state.columns);
      })
      .addCase(getColumnTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        if (action.payload.length > 0) {
          state.tasks[action.payload[0].columnId] = action.payload.sort(
            (a, b) => a.order - b.order
          );
          state.tasksLength[action.payload[0].columnId] = action.payload.length;
          console.log(state.tasks[action.payload[0].columnId]);
          return;
        }
      })
      .addCase(createColumn.fulfilled, (state, action: PayloadAction<ColumnType>) => {
        state.columns.push(action.payload);
        console.log(state.columns);
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks[action.payload.columnId].push(action.payload);
      })
      .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<ColumnType>) => {
        const index = state.columns.map((x) => x._id).indexOf(action.payload._id);
        state.columns.splice(index, 1);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        const index = state.tasks[action.payload.columnId]
          .map((x) => x._id)
          .indexOf(action.payload._id);
        state.tasks[action.payload.columnId].splice(index, 1);
        for (let i = 0; i < state.tasksLength[action.payload.columnId]; i++) {
          state.tasks[action.payload.columnId][i].order = i;
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
  setTasks,
  increaseColumnCount,
  decreaseColumnCount,
  increaseTasksCount,
  decreaseTasksCount,
} = boardReducer.actions;
