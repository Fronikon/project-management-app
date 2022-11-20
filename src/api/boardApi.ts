import { BoardType, BoardTypeWithoutId } from '../types/boardsTypes';
import { instance } from './instance';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MjQyOWIzZjMzNDgwZDJhYjgwMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg5MzI5MjIsImV4cCI6MTY2ODk3NjEyMn0.988w2oh-yh6Lh_msXS6bN4NmTYhaO62IjjyTxVNTkqs';

export const getBoardsApi = async (): Promise<BoardType[]> => {
  const res = await instance.get('boards', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const addBoardApi = async (board: BoardTypeWithoutId): Promise<BoardType> => {
  const res = await instance.post('boards', board, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteBoardApi = async (id: string): Promise<BoardType> => {
  const res = await instance.delete(`boards/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
