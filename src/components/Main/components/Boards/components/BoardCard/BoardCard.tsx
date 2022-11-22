import React, { FC, useState } from 'react';
import ConfirmAction from '../../../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import Modal from '../../../../../../componentsUtils/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import { deleteBoardTAC } from '../../../../../../store/reducers/boardsReducer';
import { BoardType } from '../../../../../../types/boardsTypes';
import styles from './BoardCard.module.css';
import textData from './../../../../../../data/textData';

interface PropsType {
  board: BoardType;
}

const BoardCard: FC<PropsType> = ({ board }) => {
  const [isOpenDeleteBoardModal, setIsOpenDeleteBoardModal] = useState(false);
  const language = useAppSelector((store) => store.language.value);

  const dispatch = useAppDispatch();

  const deleteBoard = () => {
    dispatch(deleteBoardTAC(board._id));
  };

  // const editBoard = () => {
  //   dispatch(editBoardTAC());
  // };

  const closeDeleteModal = () => {
    setIsOpenDeleteBoardModal(false);
  };

  const openDeleteModal = () => {
    setIsOpenDeleteBoardModal(true);
  };

  const renderDeleteBoardModal = () => {
    if (isOpenDeleteBoardModal) {
      return (
        <Modal closeModal={closeDeleteModal}>
          <ConfirmAction
            question={textData.boardsPage.questionConfirmingDeleteBoard[language]}
            confirm={deleteBoard}
            cancel={closeDeleteModal}
          />
        </Modal>
      );
    }
  };

  return (
    <li className={styles.boardCard} style={{ backgroundColor: board.color }}>
      <h3 className={styles.titleBoard}>
        {board.title}
        <div onClick={openDeleteModal} className={styles.deleteButton}></div>
        {renderDeleteBoardModal()}
        <div onClick={() => console.log('edit')} className={styles.editButton}></div>
      </h3>
      <div className={styles.descriptionBoardWrapper}>
        <p className={styles.descriptionBoard}>{board.description}</p>
      </div>
    </li>
  );
};

export default BoardCard;
