import { signUp, signIn } from '../api/authApi';
import { deleteUserById, getUser, putUser } from '../api/userApi';
import {
  addBoardTAC,
  deleteBoardTAC,
  editBoardTAC,
  getBoardsTAC,
} from '../store/reducers/boardsReducer';

export const requestArray = [
  signIn,
  signUp,
  getUser,
  deleteUserById,
  putUser,
  getBoardsTAC,
  addBoardTAC,
  editBoardTAC,
  deleteBoardTAC,
];
