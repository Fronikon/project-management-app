import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import styles from './Boards.module.css';
import { useAppDispatch } from './../../../../hooks/reduxHooks';
import { getBoardsTAC } from '../../../../store/reducers/boardsReducer';
import { BoardCard, CreateBoardButton } from './components';
import useToken from '../../../../hooks/useToken';

const Boards: FC = () => {
  const dispatch = useAppDispatch();
  const token = useToken();

  const boards = useAppSelector((state) => state.boardsReducer.boards);

  useEffect(() => {
    if (token) {
      dispatch(getBoardsTAC(token));
    }
  }, [dispatch, token]);

  return (
    <div className={styles.container}>
      <ul className={styles.boards}>
        <CreateBoardButton />
        {boards.map((board) => <BoardCard key={board._id} board={board} />).reverse()}
      </ul>
    </div>
  );
};

export default Boards;
