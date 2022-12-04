import { TaskType } from '../store/reducers/boardReducer';
import { instance } from './instance';

const getColumnTasks = async (boardId: string, columnId: string) => {
  const response = await instance.get(`boards/${boardId}/columns/${columnId}/tasks`);
  return response;
};
const createTask = async (taskData: TaskType) => {
  const { boardId, columnId, title, order, userId, description, color } = taskData;
  const body = {
    title,
    order,
    description,
    color,
    userId,
    users: [userId],
  };

  const response = await instance.post(`boards/${boardId}/columns/${columnId}/tasks`, body);
  return response;
};
const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  const respone = await instance.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  return respone;
};
const updateTask = async (taskData: TaskType) => {
  const { boardId, color, columnId, description, order, title, userId, users, _id } = taskData;
  const body = { title, order, description, color, columnId, userId, users };

  await instance.put(`boards/${boardId}/columns/${columnId}/tasks/${_id}`, body);
};

const TaskService = {
  getColumnTasks,
  createTask,
  deleteTask,
  updateTask,
};

export default TaskService;
