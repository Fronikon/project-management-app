import React, { FC, MouseEvent, useRef, useState } from 'react';
import ConfirmAction from '../../../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import Modal from '../../../../../../componentsUtils/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import { deleteBoardTAC } from '../../../../../../store/reducers/boardsReducer';
import { BoardType } from '../../../../../../types/boardsTypes';
import styles from './BoardCard.module.css';
import textData from './../../../../../../data/textData';
import EditBoardForm from '../../../../../../componentsUtils/forms/EditBoardForm/EditBoardForm';
import useToken from '../../../../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  board: BoardType;
}

const BoardCard: FC<PropsType> = ({ board }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useToken();

  const [statusDeleteBoardModal, setStatusDeleteBoardModal] = useState(false);
  const [statusEditBoardModal, setStatusEditBoardModal] = useState(false);

  const language = useAppSelector((store) => store.language.value);

  const deleteBoard = () => {
    if (token) {
      dispatch(deleteBoardTAC({ id: board._id, token }));
    }
  };

  const closeEditModal = () => setStatusEditBoardModal(false);
  const openEditModal = () => setStatusEditBoardModal(true);

  const closeDeleteModal = () => setStatusDeleteBoardModal(false);
  const openDeleteModal = () => setStatusDeleteBoardModal(true);

  const editButtonRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLDivElement>(null);

  const onClickToCard = (e: MouseEvent<HTMLLIElement>) => {
    if (e.target !== editButtonRef.current && e.target !== deleteButtonRef.current) {
      navigate(board._id);
    }
  };

  const renderDeleteBoardModal = () => {
    if (statusDeleteBoardModal) {
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

  const renderEditBoardModal = () => {
    if (statusEditBoardModal) {
      return (
        <Modal closeModal={closeEditModal}>
          <EditBoardForm closeModal={closeEditModal} board={board} />
        </Modal>
      );
    }
  };

  return (
    <>
      <li
        onClick={onClickToCard}
        className={styles.boardCard}
        style={{ backgroundColor: board.color }}
      >
        <h3 className={styles.titleBoard}>
          {board.title}
          <div
            ref={deleteButtonRef}
            onClick={openDeleteModal}
            className={styles.deleteButton}
          ></div>

          <div ref={editButtonRef} onClick={openEditModal} className={styles.editButton}></div>
        </h3>
        <div className={styles.descriptionBoardWrapper}>
          <p className={styles.descriptionBoard}>{board.description}</p>
        </div>
      </li>
      {renderDeleteBoardModal()}
      {renderEditBoardModal()}
    </>
  );
};

export default BoardCard;
