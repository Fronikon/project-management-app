import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ColumnService from '../../api/columnApi';
import TaskService from '../../api/taskApi';
import { ColumnRequestType } from '../../types/columnTypes';

interface GetColumnTasksArgsType {
  boardId: string;
  columnId: string;
  token: string;
}

export const getColumnTasksTAC = createAsyncThunk<TaskType[], GetColumnTasksArgsType>(
  'task/getColumnTasks',
  async ({ boardId, columnId, token }) => {
    const response = await TaskService.getColumnTasks(boardId, columnId, token);
    return await response.data;
  }
);

interface CreateTaskArgsType {
  taskData: TaskType;
  token: string;
}

export const createTaskTAC = createAsyncThunk<TaskType, CreateTaskArgsType>(
  'task/createTask',
  async ({ taskData, token }) => {
    const response = await TaskService.createTask(taskData, token);
    return response.data;
  }
);

interface DeleteTaskArgsType {
  boardId: string;
  columnId: string;
  taskId: string;
  token: string;
}

export const deleteTaskTAC = createAsyncThunk<TaskType, DeleteTaskArgsType>(
  'task/deleteTask',
  async ({ boardId, columnId, taskId, token }) => {
    const respone = await TaskService.deleteTask(boardId, columnId, taskId, token);
    return respone.data;
  }
);

interface UpdateTaskArgsType {
  taskData: TaskType;
  token: string;
}

export const updateTaskTAC = createAsyncThunk<void, UpdateTaskArgsType>(
  'task/updateTask',
  async ({ taskData, token }) => {
    await TaskService.updateTask(taskData, token);
  }
);
interface GetAllColumnsArgs {
  boardId: string;
  token: string;
}

export const getAllColumnsTAC = createAsyncThunk<ColumnType[], GetAllColumnsArgs>(
  'column/getAllColumns',
  async ({ boardId, token }) => {
    const response = await ColumnService.getAllColumns(boardId, token);
    return await response.data;
  }
);

interface CreateColumnArgs {
  boardId: string;
  columnData: ColumnRequestType;
  token: string;
}

export const createColumnTAC = createAsyncThunk<ColumnType, CreateColumnArgs>(
  'column/createColumn',
  async ({ boardId, columnData, token }) => {
    const response = await ColumnService.createColumn(boardId, columnData, token);
    return response.data;
  }
);

interface DeleteColumnArgs {
  id: string;
  boardId: string;
  token: string;
}

export const deleteColumnTAC = createAsyncThunk<ColumnType, DeleteColumnArgs>(
  'column/deleteColumn',
  async ({ boardId, id, token }) => {
    const response = await ColumnService.deleteColumn(boardId, id, token);
    return response.data;
  }
);

interface UpdateColumnArgs {
  id: string;
  boardId: string;
  columnData: ColumnRequestType;
  token: string;
}

export const updateColumnTAC = createAsyncThunk<void, UpdateColumnArgs>(
  'column/updateColumn',
  async ({ columnData, boardId, id, token }) => {
    await ColumnService.updateColumn(boardId, id, columnData, token);
  }
);

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
  columns: [],
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
      .addCase(getAllColumnsTAC.fulfilled, (state, action: PayloadAction<ColumnType[]>) => {
        state.columns = action.payload;
        state.columns = state.columns.sort((a, b) => a.order - b.order);
        state.columnLength = state.columns.length;
        for (let i = 0; i < state.columns.length; i++) {
          state.tasks[state.columns[i]._id] = [];
          state.tasksLength[action.payload[i]._id] = 0;
        }
      })
      .addCase(getColumnTasksTAC.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        if (action.payload.length > 0) {
          state.tasks[action.payload[0].columnId] = action.payload.sort(
            (a, b) => a.order - b.order
          );
          state.tasksLength[action.payload[0].columnId] = action.payload.length;
          return;
        }
      })
      .addCase(createColumnTAC.fulfilled, (state, action: PayloadAction<ColumnType>) => {
        state.columns.push(action.payload);
        state.tasks[action.payload._id] = [];
        state.tasksLength[action.payload._id] = 0;
      })
      .addCase(createTaskTAC.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks[action.payload.columnId].push(action.payload);
      })
      .addCase(deleteColumnTAC.fulfilled, (state, action: PayloadAction<ColumnType>) => {
        const index = state.columns.map((x) => x._id).indexOf(action.payload._id);
        state.columns.splice(index, 1);
      })
      .addCase(deleteTaskTAC.fulfilled, (state, action: PayloadAction<TaskType>) => {
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
