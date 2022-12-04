import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ColumnService from '../../api/columnApi';
import TaskService from '../../api/taskApi';
import { ColumnRequestType } from '../../types/columnTypes';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { RootState } from '../store';

interface GetColumnTasksArgsType {
  boardId: string;
  columnId: string;
}

interface ThunkApiType {
  rejectValue: string;
  state: RootState;
}

export const getColumnTasksTAC = createAsyncThunk<TaskType[], GetColumnTasksArgsType, ThunkApiType>(
  'task/getColumnTasks',
  async ({ boardId, columnId }, { rejectWithValue, getState }) => {
    try {
      const response = await TaskService.getColumnTasks(boardId, columnId);
      return await response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface CreateTaskArgsType {
  taskData: TaskType;
}

export const createTaskTAC = createAsyncThunk<TaskType, CreateTaskArgsType, ThunkApiType>(
  'task/createTask',
  async ({ taskData }, { rejectWithValue, getState }) => {
    try {
      const response = await TaskService.createTask(taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface DeleteTaskArgsType {
  boardId: string;
  columnId: string;
  taskId: string;
}

export const deleteTaskTAC = createAsyncThunk<TaskType, DeleteTaskArgsType, ThunkApiType>(
  'task/deleteTask',
  async ({ boardId, columnId, taskId }, { rejectWithValue, getState }) => {
    try {
      const respone = await TaskService.deleteTask(boardId, columnId, taskId);
      return respone.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface UpdateTaskArgsType {
  taskData: TaskType;
}

export const updateTaskTAC = createAsyncThunk<void, UpdateTaskArgsType, ThunkApiType>(
  'task/updateTask',
  async ({ taskData }, { rejectWithValue, getState }) => {
    try {
      await TaskService.updateTask(taskData);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);
interface GetAllColumnsArgs {
  boardId: string;
}

export const getAllColumnsTAC = createAsyncThunk<ColumnType[], GetAllColumnsArgs, ThunkApiType>(
  'column/getAllColumns',
  async ({ boardId }, { rejectWithValue, getState }) => {
    try {
      const response = await ColumnService.getAllColumns(boardId);
      return await response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface CreateColumnArgs {
  boardId: string;
  columnData: ColumnRequestType;
}

export const createColumnTAC = createAsyncThunk<ColumnType, CreateColumnArgs, ThunkApiType>(
  'column/createColumn',
  async ({ boardId, columnData }, { rejectWithValue, getState }) => {
    try {
      const response = await ColumnService.createColumn(boardId, columnData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface DeleteColumnArgs {
  id: string;
  boardId: string;
}

export const deleteColumnTAC = createAsyncThunk<ColumnType, DeleteColumnArgs, ThunkApiType>(
  'column/deleteColumn',
  async ({ boardId, id }, { rejectWithValue, getState }) => {
    try {
      const response = await ColumnService.deleteColumn(boardId, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
  }
);

interface UpdateColumnArgs {
  id: string;
  boardId: string;
  columnData: ColumnRequestType;
}

export const updateColumnTAC = createAsyncThunk<void, UpdateColumnArgs, ThunkApiType>(
  'column/updateColumn',
  async ({ columnData, boardId, id }, { rejectWithValue, getState }) => {
    try {
      await ColumnService.updateColumn(boardId, id, columnData);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error as Error | AxiosError, getState().language.value)
      );
    }
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

export interface taskChangeType {
  taskId: string;
  columnId: string;
  value?: TaskType;
}

interface InitialStateType {
  title: string;
  description: string;
  color: string;
  order: number;
  columnId: string;
  taskId: string;
  columnLength: number;
  tasksLength: { [index: string]: number };
  isModalOpen: boolean;
  isColumnModalOpen: boolean;
  isTaskModalOpen: boolean;
  isChangeColumnModalOpen: boolean;
  isChangeTaskModalOpen: boolean;
  columns: ColumnType[];
  tasks: { [index: string]: TaskType[] };
}

const initialState: InitialStateType = {
  title: '',
  description: '',
  color: '#000000',
  order: 0,
  columnId: '',
  taskId: '',
  columnLength: 0,
  tasksLength: {},
  isModalOpen: false,
  isColumnModalOpen: false,
  isTaskModalOpen: false,
  isChangeColumnModalOpen: false,
  isChangeTaskModalOpen: false,
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
    toggleColumnChange(state) {
      state.isChangeColumnModalOpen = !state.isChangeColumnModalOpen;
    },
    toggleTaskChange(state) {
      state.isChangeTaskModalOpen = !state.isChangeTaskModalOpen;
    },
    setCurrentColumnId(state, action) {
      state.columnId = action.payload;
    },
    resetColumnId(state) {
      state.columnId = '';
    },
    setCurrentTaskId(state, action: PayloadAction<taskChangeType>) {
      state.taskId = action.payload.taskId;
      state.columnId = action.payload.columnId;
    },
    resetTaskId(state) {
      state.taskId = '';
    },
    setColumns(state, action) {
      state.columns = action.payload;
    },
    setTasks(state, action) {
      state.tasks[action.payload.id] = action.payload.items;
    },
    updateSpecialTask(state, action: PayloadAction<TaskType>) {
      const index = state.tasks[action.payload.columnId]
        .map((x) => x._id)
        .indexOf(action.payload._id);
      state.tasks[action.payload.columnId].splice(index, 1, action.payload);
    },
    updateSpecialColumn(state, action: PayloadAction<ColumnType>) {
      const index = state.columns.map((x) => x._id).indexOf(action.payload._id);
      state.columns.splice(index, 1, action.payload);
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
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
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
  toggleColumnChange,
  toggleTaskChange,
  setCurrentColumnId,
  setCurrentTaskId,
  resetColumnId,
  resetTaskId,
  setColumns,
  setTasks,
  increaseColumnCount,
  decreaseColumnCount,
  increaseTasksCount,
  decreaseTasksCount,
  updateSpecialTask,
  updateSpecialColumn,
  setTitle,
  setDescription,
  setColor,
  setOrder,
} = boardReducer.actions;
