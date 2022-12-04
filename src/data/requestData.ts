import { signInTAC, signUpTAC } from '../store/reducers/authReducer';
import { changeUserTAC, deleteUserTAC, getUserTAC } from '../store/reducers/userReducer';
import {
  updateColumnTAC,
  deleteColumnTAC,
  createColumnTAC,
  getAllColumnsTAC,
  updateTaskTAC,
  deleteTaskTAC,
  getColumnTasksTAC,
  createTaskTAC,
} from '../store/reducers/boardReducer';
import {
  addBoardTAC,
  deleteBoardTAC,
  editBoardTAC,
  getBoardsTAC,
} from '../store/reducers/boardsReducer';

export const requestArray = [
  updateColumnTAC,
  deleteColumnTAC,
  createColumnTAC,
  getAllColumnsTAC,
  updateTaskTAC,
  deleteTaskTAC,
  getColumnTasksTAC,
  createTaskTAC,
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
