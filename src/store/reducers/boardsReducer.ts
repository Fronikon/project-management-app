import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addBoardApi, deleteBoardApi, getBoardsApi } from '../../api/boardApi';
import { BoardType, BoardTypeWithoutId } from '../../types/boardsTypes';
import { RejectResponseType } from './../../types/apiTypes';
import { editBoardApi } from './../../api/boardApi';

interface initialStateType {
  boards: BoardType[];
}

const initialState: initialStateType = {
  boards: [],
};

export const getBoardsTAC = createAsyncThunk<BoardType[], string, { rejectValue: string }>(
  'boards/getBoards',
  async (token, { rejectWithValue }) => {
    try {
      return await getBoardsApi(token);
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

interface AddBoardTACType {
  board: BoardTypeWithoutId;
  token: string;
}

export const addBoardTAC = createAsyncThunk<BoardType, AddBoardTACType, { rejectValue: string }>(
  'boards/addBoard',
  async ({ board, token }, { rejectWithValue }) => {
    try {
      return await addBoardApi(board, token);
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

interface EditBoardTACType {
  board: BoardType;
  token: string;
}

export const editBoardTAC = createAsyncThunk<BoardType, EditBoardTACType, { rejectValue: string }>(
  'boards/editBoard',
  async ({ board, token }, { rejectWithValue }) => {
    try {
      const { _id, ...rest } = board;
      return await editBoardApi(rest, _id, token);
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

interface DeleteBoardTACType {
  id: string;
  token: string;
}

export const deleteBoardTAC = createAsyncThunk<string, DeleteBoardTACType, { rejectValue: string }>(
  'boards/deleteBoard',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await deleteBoardApi(id, token);
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
    builder.addCase(getBoardsTAC.fulfilled, (state, { payload }) => {
      state.boards = payload;
    });
    builder.addCase(addBoardTAC.fulfilled, (state, { payload }) => {
      state.boards.push(payload);
    });
    builder.addCase(editBoardTAC.fulfilled, (state, { payload }) => {
      state.boards = state.boards.map((item) => {
        if (item._id === payload._id) {
          return payload;
        }
        return item;
      });
    });
    builder.addCase(deleteBoardTAC.fulfilled, (state, { payload }) => {
      const index = state.boards.findIndex((el) => el._id === payload);
      if (index > -1) {
        state.boards.splice(index, 1);
      }
    });
  },
});

export default boardsSlice.reducer;
