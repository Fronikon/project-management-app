import React, { useState } from 'react';
import CreateBoardForm from '../../../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import Modal from '../../../../../../componentsUtils/Modal/Modal';
import styles from './CreateBoardButton.module.css';

const CreateBoardButton = () => {
  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);

  const closeCreateModal = () => {
    setIsOpenCreateBoardModal(false);
  };

  const openCreateModal = () => {
    setIsOpenCreateBoardModal(true);
  };

  const renderCreateBoardModal = () => {
    if (isOpenCreateBoardModal) {
      return (
        <Modal closeModal={closeCreateModal}>
          <CreateBoardForm closeModal={closeCreateModal} />
        </Modal>
      );
    }
  };

  return (
    <>
      <li className={styles.addBoard} onClick={openCreateModal}>
        <div className={styles.addBoardPlus}>
          <div className={styles.gorizontalLine}></div>
          <div className={styles.verticalLine}></div>
        </div>
      </li>
      {renderCreateBoardModal()}
    </>
  );
};

export default CreateBoardButton;
