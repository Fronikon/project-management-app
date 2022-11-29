import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../store/reducers/boardReducer';

const url = 'https://pma-backend.onrender.com/boards/6371414f2821a7b9af9f0090/columns';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MjQyOWIzZjMzNDgwZDJhYjgwMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njk3MjYwMTMsImV4cCI6MTY2OTc2OTIxM30.IuQJ0Hhj9pUlRRgeQana2zNLSksV2HyCz9y6FQjgmnE';

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

export const updateTasks = createAsyncThunk<void, TaskType>('column/updateTasks', async (arg) => {
  await axios.put(
    `${url}/${arg.columnId}/tasks/${arg._id}`,
    {
      title: arg.title,
      order: arg.order,
      description: arg.description,
      color: arg.color,
      columnId: arg.columnId,
      userId: arg.userId,
      users: arg.users,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
});
