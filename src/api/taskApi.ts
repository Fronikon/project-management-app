import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../store/reducers/boardReducer';

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MjQyOWIzZjMzNDgwZDJhYjgwMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njk0NDc0MDMsImV4cCI6MTY2OTQ5MDYwM30.DCaosyHFFEcYwJZu4bDaPm_pC9U1m7W0I0KfRk9yVFk';

export const getColumnTasks = createAsyncThunk<TaskType[], { _id: string }>(
  'column/getColumnTasks',
  async (arg) => {
    const response = await axios.get(`${url}/${arg._id}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.data;
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

export const deleteTask = createAsyncThunk<void, { columnId: string; taskId: string }>(
  'column/deleteTask',
  async (arg) => {
    await axios.delete(`${url}/${arg.columnId}/tasks/${arg.taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
);
