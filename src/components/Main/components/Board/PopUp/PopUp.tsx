import React, { FC } from 'react';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import {
  toggleColumn,
  toggleColumnChange,
  toggleColumnDelete,
  toggleTask,
  toggleTaskChange,
  toggleTaskDelete,
} from '../../../../../store/reducers/boardReducer';
import Modal from '../../../../../componentsUtils/Modal/Modal';
import CreateColumn from './Modals/createColumn';
import CreateTask from './Modals/createTask';
import EditColumn from './Modals/EditColumn';
import EditTask from './Modals/EditTask';
import DeleteColumn from './Modals/deleteColumn';
import DeleteTask from './Modals/deleteTask';
import { useDispatch } from 'react-redux';

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
  const isDeleteColumnModalOpen = useAppSelector(
    (store) => store.boardReducer.isDeleteColumnModalOpen
  );
  const isDeleteTaskModalOpen = useAppSelector((store) => store.boardReducer.isDeleteTaskModalOpen);
  const dispatch = useDispatch();

  const closeCreateColumnModal = () => {
    dispatch(toggleColumn());
  };

  const closeCreateTaskModal = () => {
    dispatch(toggleTask());
  };

  const closeEditColumnModal = () => {
    dispatch(toggleColumnChange());
  };

  const closeEditTaskModal = () => {
    dispatch(toggleTaskChange());
  };

  const closeDeleteColumnModal = () => {
    dispatch(toggleColumnDelete());
  };

  const closeDeleteTaskModal = () => {
    dispatch(toggleTaskDelete());
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

  const renderDeleteColumn = () => {
    if (isDeleteColumnModalOpen) {
      return (
        <Modal closeModal={closeDeleteColumnModal}>
          <DeleteColumn closeModal={closeDeleteColumnModal} />
        </Modal>
      );
    }
  };

  const renderDeleteTask = () => {
    if (isDeleteTaskModalOpen) {
      return (
        <Modal closeModal={closeDeleteTaskModal}>
          <DeleteTask closeModal={closeDeleteTaskModal} />
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
      {renderDeleteColumn()}
      {renderDeleteTask()}
    </>
  );
};

export default PopUp;
