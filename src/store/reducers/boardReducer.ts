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
  value: ColumnArrayType[];
}

const initialState: InitialStateType = {
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
  },
});

export default boardReducer.reducer;

export const { addColumn, addTask } = boardReducer.actions;
