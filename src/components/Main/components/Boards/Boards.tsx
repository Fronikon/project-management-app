import React, { FC, useState } from 'react';
import CreateBoardForm from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import Modal from '../../../../componentsUtils/Modal/Modal';
import styles from './Boards.module.css';

const Boards: FC = () => {
  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);

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
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.addBoard} onClick={openModal}>
          <div className={styles.addBoardPlus}>
            <div className={styles.gorizontalLine}></div>
            <div className={styles.verticalLine}></div>
          </div>
        </li>
      </ul>
      {renderCreateBoardModal()}
    </div>
  );
};

export default Boards;
