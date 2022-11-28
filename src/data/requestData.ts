import { signUp, signIn } from '../api/authApi';
import {
  addBoardTAC,
  deleteBoardTAC,
  editBoardTAC,
  getBoardsTAC,
} from '../store/reducers/boardsReducer';

export const requestArray = [
  signIn,
  signUp,
  getBoardsTAC,
  addBoardTAC,
  editBoardTAC,
  deleteBoardTAC,
];
