import { BoardType } from '../types/boardsTypes';
import { instance } from './instance';

const token = '';

export const getBoardsFromServer = async (): Promise<BoardType[]> => {
  console.log(token);
  const res = await instance.get('boards', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
