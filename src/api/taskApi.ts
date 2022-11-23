import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppSelector } from '../hooks/reduxHooks';
import { ColumnType, TaskType } from '../store/reducers/boardReducer';

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token = '';

export const getColumnTasks = createAsyncThunk<TaskType[], { _id: string }>(
  'column/getColumnTasks',
  async (arg) => {
    const response = await axios.get(`${url}/${arg._id}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const createTask = createAsyncThunk<void, TaskType>('column/createTask', async (arg) => {
  await axios.post(
    `${url}/${arg.columnId}/tasks`,
    {
      title: arg.title,
      order: 1,
      description: arg.description,
      color: arg.color,
      userId: arg.userId,
      users: [],
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
});
