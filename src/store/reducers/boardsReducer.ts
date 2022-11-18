import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addBoardApi, deleteBoardApi, getBoardsApi } from '../../api/boardApi';
import { BoardType, BoardTypeWithoutId } from '../../types/boardsTypes';
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
      return await getBoardsApi();
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

export const addBoardTAC = createAsyncThunk<BoardType, BoardTypeWithoutId, { rejectValue: string }>(
  'boards/addBoard',
  async (board, { rejectWithValue }) => {
    try {
      return await addBoardApi(board);
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

export const deleteBoardTAC = createAsyncThunk<string, string, { rejectValue: string }>(
  'boards/deleteBoard',
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteBoardApi(id);
      return res._id;
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
    builder.addCase(addBoardTAC.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });
    builder.addCase(deleteBoardTAC.fulfilled, (state, action) => {
      const index = state.boards.findIndex((el) => el._id === action.payload);
      if (index > -1) {
        state.boards.splice(index, 1);
      }
    });
  },
});

export default boardsSlice.reducer;
