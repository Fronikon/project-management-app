import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBoardsFromServer } from '../../api/boardApi';
import { BoardType } from '../../types/boardsTypes';
import { RejectResponseType } from './../../types/apiTypes';

interface initialStateType {
  boards: BoardType[];
}

const initialState: initialStateType = {
  boards: [],
};

export const getBoardsTAC = createAsyncThunk<BoardType[], void, { rejectValue: string }>(
  'boards/getBoards',
  async (__, { rejectWithValue }) => {
    try {
      return await getBoardsFromServer();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          const errorData: RejectResponseType = error.response.data;
          return rejectWithValue(errorData.message);
        } else {
          return rejectWithValue('Unknown error');
        }
      } else {
        return rejectWithValue((error as Error).message);
      }
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardsTAC.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
  },
});

export default boardsSlice.reducer;
