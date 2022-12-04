import { BoardType, BoardTypeWithoutId } from '../types/boardsTypes';
import { instance } from './instance';

export const getBoards = async (): Promise<BoardType[]> => {
  const res = await instance.get('boards');
  return res.data;
};

export const addBoard = async (board: BoardTypeWithoutId): Promise<BoardType> => {
  const res = await instance.post('boards', board, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const editBoard = async (board: BoardTypeWithoutId, id: string): Promise<BoardType> => {
  const res = await instance.put(`boards/${id}`, board, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteBoard = async (id: string): Promise<BoardType> => {
  const res = await instance.delete(`boards/${id}`);
  return res.data;
};

const BoardService = { getBoards, addBoard, editBoard, deleteBoard };
export default BoardService;
