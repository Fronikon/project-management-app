import { ColumnRequestType } from '../types/columnTypes';
import { instance } from './instance';

const getAllColumns = async (boardId: string) => {
  const response = await instance.get(`boards/${boardId}/columns`);
  return response;
};
const createColumn = async (boardId: string, columnData: ColumnRequestType) => {
  const { title, order } = columnData;
  const body = { title, order };

  const response = await instance.post(`boards/${boardId}/columns`, body);
  return response;
};
const deleteColumn = async (boardId: string, columnId: string) => {
  const response = await instance.delete(`boards/${boardId}/columns/${columnId}`);
  return response;
};
const updateColumn = async (boardId: string, columnId: string, columnData: ColumnRequestType) => {
  const { title, order } = columnData;
  const body = { title, order };

  await instance.put(`boards/${boardId}/columns/${columnId}`, body);
};

const ColumnService = { getAllColumns, createColumn, deleteColumn, updateColumn };
export default ColumnService;
