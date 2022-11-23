import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../store/reducers/boardReducer';

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
      order: arg.order,
      description: arg.description,
      color: arg.color,
      userId: arg.userId,
      users: arg.users,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
});
