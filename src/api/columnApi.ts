import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ColumnType, TaskType } from '../store/reducers/boardReducer';

interface apiColumnType {
  title: string;
  order: number;
  id?: string;
}

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MjQyOWIzZjMzNDgwZDJhYjgwMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njk4MjI1OTQsImV4cCI6MTY2OTg2NTc5NH0.PO1MuA85gxaONwbiLuTccXLxxos7EfiPnLFX9Fo2oyM';

export const getAllColumns = createAsyncThunk<ColumnType[], void>(
  'column/getAllColumns',
  async () => {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return await response.data;
  }
);

export const createColumn = createAsyncThunk<ColumnType, apiColumnType>(
  'column/createColumn',
  async (arg) => {
    const response = await axios.post(
      url,
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

export const deleteColumn = createAsyncThunk<ColumnType, { id: string }>(
  'column/deleteColumn',
  async (arg) => {
    const response = await axios.delete(`${url}/${arg.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateColumn = createAsyncThunk<void, apiColumnType>(
  'column/updateColumn',
  async (arg) => {
    await axios.put(
      `${url}/${arg.id}`,
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
