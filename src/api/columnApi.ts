import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseJwt } from '../data/parseJWT';
import { ColumnType } from '../store/reducers/boardReducer';

interface apiColumnType {
  title: string;
  order: number;
  boardId: string;
  id?: string;
}

const url = 'https://pma-backend.onrender.com/boards';
const token = localStorage.getItem('token');
export const parsedToken = parseJwt(token as string);

export const getAllColumns = createAsyncThunk<ColumnType[], { boardId: string }>(
  'column/getAllColumns',
  async (arg) => {
    const response = await axios.get(`${url}/${arg.boardId}/columns`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.data;
  }
);

export const createColumn = createAsyncThunk<ColumnType, apiColumnType>(
  'column/createColumn',
  async (arg) => {
    const response = await axios.post(
      `${url}/${arg.boardId}/columns`,
      {
        title: arg.title,
        order: arg.order,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const deleteColumn = createAsyncThunk<ColumnType, { id: string; boardId: string }>(
  'column/deleteColumn',
  async (arg) => {
    const response = await axios.delete(`${url}/${arg.boardId}/columns/${arg.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateColumn = createAsyncThunk<void, apiColumnType>(
  'column/updateColumn',
  async (arg) => {
    await axios.put(
      `${url}/${arg.boardId}/columns/${arg.id}`,
      {
        title: arg.title,
        order: arg.order,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
);
