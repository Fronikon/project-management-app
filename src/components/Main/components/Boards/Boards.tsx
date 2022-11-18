import React, { FC, useEffect, useState } from 'react';
import CreateBoardForm from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import Modal from '../../../../componentsUtils/Modal/Modal';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import styles from './Boards.module.css';
import { useAppDispatch } from './../../../../hooks/reduxHooks';
import { deleteBoardTAC, getBoardsTAC } from '../../../../store/reducers/boardsReducer';

const Boards: FC = () => {
  const dispatch = useAppDispatch();

  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);

  const boards = useAppSelector((state) => state.boardsReducer.boards);

  useEffect(() => {
    dispatch(getBoardsTAC());
  }, [dispatch]);

  const closeModal = () => {
    setIsOpenCreateBoardModal(false);
  };

  const openModal = () => {
    setIsOpenCreateBoardModal(true);
  };

  const renderCreateBoardModal = () => {
    if (isOpenCreateBoardModal) {
      return (
        <Modal closeModal={closeModal}>
          <CreateBoardForm closeModal={closeModal} />
        </Modal>
      );
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.boards}>
        <li className={styles.addBoard} onClick={openModal}>
          <div className={styles.addBoardPlus}>
            <div className={styles.gorizontalLine}></div>
            <div className={styles.verticalLine}></div>
          </div>
        </li>
        {boards
          .map((board) => {
            const deleteBoard = () => {
              dispatch(deleteBoardTAC(board._id));
            };

            // const editBoard = () => {
            //   dispatch(editBoardTAC());
            // };

            return (
              <li className={styles.boardCard} key={board._id}>
                <h3 className={styles.titleBoard}>
                  {board.title}
                  <div onClick={deleteBoard} className={styles.deleteButton}></div>
                  <div onClick={() => console.log('edit')} className={styles.editButton}></div>
                </h3>
                <div className={styles.descriptionBoardWrapper}>
                  <p className={styles.descriptionBoard}>{board.description}</p>
                </div>
              </li>
            );
          })
          .reverse()}
      </ul>
      {renderCreateBoardModal()}
    </div>
  );
};

export default Boards;
