import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ColumnType } from '../store/reducers/boardReducer';

const url =
  'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns/6376c2faa1aeb7f9824d4d60/tasks';
const token = '';

export const getColumnTasks = createAsyncThunk<ColumnType, void>(
  'column/getColumnTasks',
  async () => {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }
);
