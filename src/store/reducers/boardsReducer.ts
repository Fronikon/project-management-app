import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardService from '../../api/boardApi';
import { BoardType, BoardTypeWithoutId } from '../../types/boardsTypes';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { RootState } from '../store';

interface initialStateType {
  boards: BoardType[];
}

const initialState: initialStateType = {
  boards: [],
};

export const getBoardsTAC = createAsyncThunk<
  BoardType[],
  void,
  { rejectValue: string; state: RootState }
>('boards/getBoards', async (__, { rejectWithValue, getState }) => {
  try {
    return await BoardService.getBoards();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});

interface AddBoardTACType {
  board: BoardTypeWithoutId;
}

export const addBoardTAC = createAsyncThunk<
  BoardType,
  AddBoardTACType,
  { rejectValue: string; state: RootState }
>('boards/addBoard', async ({ board }, { rejectWithValue, getState }) => {
  try {
    return await BoardService.addBoard(board);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});

interface EditBoardTACType {
  board: BoardType;
}

export const editBoardTAC = createAsyncThunk<
  BoardType,
  EditBoardTACType,
  { rejectValue: string; state: RootState }
>('boards/editBoard', async ({ board }, { rejectWithValue, getState }) => {
  try {
    const { _id, ...rest } = board;
    return await BoardService.editBoard(rest, _id);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});

interface DeleteBoardTACType {
  id: string;
}

export const deleteBoardTAC = createAsyncThunk<
  string,
  DeleteBoardTACType,
  { rejectValue: string; state: RootState }
>('boards/deleteBoard', async ({ id }, { rejectWithValue, getState }) => {
  try {
    const res = await BoardService.deleteBoard(id);
    return res._id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error | AxiosError, getState().language.value));
  }
});

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
