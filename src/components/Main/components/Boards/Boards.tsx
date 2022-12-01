import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import styles from './Boards.module.css';
import { useAppDispatch } from './../../../../hooks/reduxHooks';
import { getBoardsTAC } from '../../../../store/reducers/boardsReducer';
import { BoardCard, CreateBoardButton } from './components';
import useToken from '../../../../hooks/useToken';
import Loader from '../../../../componentsUtils/Loader/Loader';
import Modal from '../../../../componentsUtils/Modal/Modal';
import modalStyles from '../../../../componentsUtils/Modal/Modal.module.css';
import { cleanError } from '../../../../store/slices/sliceErrorAndLoading';

const Boards: FC = () => {
  const dispatch = useAppDispatch();
  const token = useToken();
  const error = useAppSelector((store) => store.errorAndLoadingReducer.error);
  const isLoading = useAppSelector((store) => store.errorAndLoadingReducer.isLoading);
  const boards = useAppSelector((state) => state.boardsReducer.boards);
  const [isModalError, setIsModalError] = useState(false);

  const closeModalError = () => {
    setIsModalError(false);
    dispatch(cleanError());
  };

  useEffect(() => {
    if (error) setIsModalError(true);
  }, [error]);

  useEffect(() => {
    if (token) {
      dispatch(getBoardsTAC(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.boards}>
          <CreateBoardButton />
          {boards.map((board) => <BoardCard key={board._id} board={board} />).reverse()}
        </ul>
      </div>

      {isModalError && (
        <Modal closeModal={closeModalError}>
          <div className={modalStyles.modalWrapper}>
            <h2>{error}</h2>
          </div>
        </Modal>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export default Boards;
