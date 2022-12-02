import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../store/reducers/boardReducer';

const url = 'https://pma-backend.onrender.com/boards';

export const getColumnTasks = createAsyncThunk<TaskType[], { _id: string; boardId: string }>(
  'column/getColumnTasks',
  async (arg) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/${arg.boardId}/columns/${arg._id}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.data;
  }
);

export const createTask = createAsyncThunk<TaskType, TaskType>('column/createTask', async (arg) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${url}/${arg.boardId}/columns/${arg.columnId}/tasks`,
    {
      title: arg.title,
      order: arg.order,
      description: arg.description,
      color: arg.color,
      userId: arg.userId,
      users: [arg.userId],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

export const deleteTask = createAsyncThunk<
  TaskType,
  { columnId: string; taskId: string; boardId: string }
>('column/deleteTask', async (arg) => {
  const token = localStorage.getItem('token');
  const respone = await axios.delete(
    `${url}/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return respone.data;
});

export const updateTasks = createAsyncThunk<void, TaskType>('column/updateTasks', async (arg) => {
  const token = localStorage.getItem('token');
  await axios.put(
    `${url}/${arg.boardId}/columns/${arg.columnId}/tasks/${arg._id}`,
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
