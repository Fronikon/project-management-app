import { BoardType, BoardTypeWithoutId } from '../types/boardsTypes';
import { instance } from './instance';

export const getBoards = async (token: string): Promise<BoardType[]> => {
  const res = await instance.get('boards', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const addBoard = async (board: BoardTypeWithoutId, token: string): Promise<BoardType> => {
  const res = await instance.post('boards', board, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const editBoard = async (
  board: BoardTypeWithoutId,
  id: string,
  token: string
): Promise<BoardType> => {
  const res = await instance.put(`boards/${id}`, board, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteBoard = async (id: string, token: string): Promise<BoardType> => {
  const res = await instance.delete(`boards/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const BoardService = { getBoards, addBoard, editBoard, deleteBoard };
export default BoardService;
