import { signInTAC, signUpTAC } from '../store/reducers/authReducer';
import { changeUserTAC, deleteUserTAC, getUserTAC } from '../store/reducers/userReducer';
import {
  addBoardTAC,
  deleteBoardTAC,
  editBoardTAC,
  getBoardsTAC,
} from '../store/reducers/boardsReducer';

export const requestArray = [
  signInTAC,
  signUpTAC,
  getUserTAC,
  deleteUserTAC,
  changeUserTAC,
  getBoardsTAC,
  addBoardTAC,
  editBoardTAC,
  deleteBoardTAC,
];
