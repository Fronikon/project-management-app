import { TaskType } from '../store/reducers/boardReducer';
import { instance } from './instance';

const getColumnTasks = async (boardId: string, columnId: string, token: string) => {
  const response = await instance.get(`boards/${boardId}/columns/${columnId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
const createTask = async (taskData: TaskType, token: string) => {
  const { boardId, columnId, title, order, userId, description, color } = taskData;
  const body = {
    title,
    order,
    description,
    color,
    userId,
    users: [userId],
  };

  const response = await instance.post(`boards/${boardId}/columns/${columnId}/tasks`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response;
};
const deleteTask = async (boardId: string, columnId: string, taskId: string, token: string) => {
  const respone = await instance.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return respone;
};
const updateTask = async (taskData: TaskType, token: string) => {
  const { boardId, color, columnId, description, order, title, userId, users, _id } = taskData;
  const body = { title, order, description, color, columnId, userId, users };

  await instance.put(`boards/${boardId}/columns/${columnId}/tasks/${_id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const TaskService = {
  getColumnTasks,
  createTask,
  deleteTask,
  updateTask,
};

export default TaskService;
