import { ColumnRequestType } from '../types/columnTypes';
import { instance } from './instance';

const getAllColumns = async (boardId: string, token: string) => {
  const response = await instance.get(`boards/${boardId}/columns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
const createColumn = async (boardId: string, columnData: ColumnRequestType, token: string) => {
  const { title, order } = columnData;
  const body = { title, order };

  const response = await instance.post(`boards/${boardId}/columns`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
const deleteColumn = async (boardId: string, columnId: string, token: string) => {
  const response = await instance.delete(`boards/${boardId}/columns/${columnId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
const updateColumn = async (
  boardId: string,
  columnId: string,
  columnData: ColumnRequestType,
  token: string
) => {
  const { title, order } = columnData;
  const body = { title, order };

  await instance.put(`boards/${boardId}/columns/${columnId}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const ColumnService = { getAllColumns, createColumn, deleteColumn, updateColumn };
export default ColumnService;
