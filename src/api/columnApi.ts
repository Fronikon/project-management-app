import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ColumnType } from '../store/reducers/boardReducer';

interface createColumnType {
  title: string;
  order: number;
}

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token = '';

export const getAllColumns = createAsyncThunk<ColumnType[], void>(
  'column/getAllColumns',
  async () => {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }
);

export const createColumn = createAsyncThunk<void, createColumnType>(
  'column/createColumn',
  async (arg) => {
    await axios.post(
      url,
      {
        title: arg.title,
        order: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
);

export const deleteColumn = createAsyncThunk<void, { id: string }>(
  'column/deleteColumn',
  async (arg) => {
    await axios.delete(`${url}/${arg.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
);
