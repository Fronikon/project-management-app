import React, { FC } from 'react';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import {
  toggleColumn,
  toggleColumnChange,
  toggleTask,
  toggleTaskChange,
} from '../../../../../store/reducers/boardReducer';
import styles from './PopUp.module.css';
import Modal from '../../../../../componentsUtils/Modal/Modal';
import CreateColumn from './Modals/createColumn';
import CreateTask from './Modals/createTask';
import EditColumn from './Modals/EditColumn';
import EditTask from './Modals/EditTask';

export interface PopUpType {
  title: string;
  description: string;
}

const PopUp: FC = () => {
  const isColumnModalOpen = useAppSelector((store) => store.boardReducer.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.boardReducer.isTaskModalOpen);
  const isChangeColumnModalOpen = useAppSelector(
    (store) => store.boardReducer.isChangeColumnModalOpen
  );
  const isChangeTaskModalOpen = useAppSelector((store) => store.boardReducer.isChangeTaskModalOpen);

  const closeCreateColumnModal = () => {
    toggleColumn();
  };

  const closeCreateTaskModal = () => {
    toggleTask();
  };

  const closeEditColumnModal = () => {
    toggleColumnChange();
  };

  const closeEditTaskModal = () => {
    toggleTaskChange();
  };

  const renderCreateColumn = () => {
    if (isColumnModalOpen) {
      return (
        <Modal closeModal={closeCreateColumnModal}>
          <CreateColumn closeModal={closeCreateColumnModal} />
        </Modal>
      );
    }
  };

  const renderCreateTask = () => {
    if (isTaskModalOpen) {
      return (
        <Modal closeModal={closeCreateTaskModal}>
          <CreateTask closeModal={closeCreateTaskModal} />
        </Modal>
      );
    }
  };

  const renderEditColumn = () => {
    if (isChangeColumnModalOpen) {
      return (
        <Modal closeModal={closeEditColumnModal}>
          <EditColumn closeModal={closeEditColumnModal} />
        </Modal>
      );
    }
  };

  const renderEditTask = () => {
    if (isChangeTaskModalOpen) {
      return (
        <Modal closeModal={closeEditTaskModal}>
          <EditTask closeModal={closeEditTaskModal} />
        </Modal>
      );
    }
  };

  return (
    <>
      {renderCreateColumn()}
      {renderCreateTask()}
      {renderEditColumn()}
      {renderEditTask()}
    </>
  );
};

export default PopUp;
