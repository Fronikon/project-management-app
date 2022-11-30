import { signUp, signIn } from '../api/authApi';
import { putUser } from '../api/userApi';
import {
  addBoardTAC,
  deleteBoardTAC,
  editBoardTAC,
  getBoardsTAC,
} from '../store/reducers/boardsReducer';

export const requestArray = [
  signIn,
  signUp,
  putUser,
  getBoardsTAC,
  addBoardTAC,
  editBoardTAC,
  deleteBoardTAC,
];
