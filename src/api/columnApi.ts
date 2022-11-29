import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ColumnType } from '../store/reducers/boardReducer';

interface apiColumnType {
  title: string;
  order: number;
  id?: string;
}

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MjQyOWIzZjMzNDgwZDJhYjgwMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njk3MjYwMTMsImV4cCI6MTY2OTc2OTIxM30.IuQJ0Hhj9pUlRRgeQana2zNLSksV2HyCz9y6FQjgmnE';

export const getAllColumns = createAsyncThunk<ColumnType[], void>(
  'column/getAllColumns',
  async () => {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return await response.data;
  }
);

export const createColumn = createAsyncThunk<void, apiColumnType>(
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
