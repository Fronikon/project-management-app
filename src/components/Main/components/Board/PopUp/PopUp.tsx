import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createColumn, updateColumn } from '../../../../../api/columnApi';
import { createTask, updateTasks } from '../../../../../api/taskApi';
import CancelButton from '../../../../../componentsUtils/buttons/CancelButton/CancelButton';
import ConfirmButton from '../../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import ColorInputForm from '../../../../../componentsUtils/customInputsForm/ColorInputForm/ColorInputForm';
import TextInputForm from '../../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import CreateBoardForm from '../../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import textData from '../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import {
  increaseColumnCount,
  increaseTasksCount,
  resetColumnId,
  resetTaskId,
  setColor,
  setDescription,
  setOrder,
  setTitle,
  toggleColumn,
  toggleColumnChange,
  toggleModal,
  toggleTask,
  toggleTaskChange,
  updateSpecialColumn,
  updateSpecialTask,
} from '../../../../../store/reducers/boardReducer';
import styles from './PopUp.module.css';
import Modal from '../../../../../componentsUtils/Modal/Modal';

export interface PopUpType {
  title: string;
  description: string;
}

const PopUp: FC = () => {
  const isModalOpen = useAppSelector((store) => store.boardReducer.isModalOpen);
  const isColumnModalOpen = useAppSelector((store) => store.boardReducer.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.boardReducer.isTaskModalOpen);
  const isChangeColumnModalOpen = useAppSelector(
    (store) => store.boardReducer.isChangeColumnModalOpen
  );
  const isChangeTaskModalOpen = useAppSelector((store) => store.boardReducer.isChangeTaskModalOpen);
  const language = useAppSelector((store) => store.language.value);
  const columnId = useAppSelector((store) => store.boardReducer.columnId);
  const taskId = useAppSelector((store) => store.boardReducer.taskId);
  const columnLength = useAppSelector((store) => store.boardReducer.columnLength);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const title = useAppSelector((store) => store.boardReducer.title);
  const color = useAppSelector((store) => store.boardReducer.color);
  const description = useAppSelector((store) => store.boardReducer.description);
  const order = useAppSelector((store) => store.boardReducer.order);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<PopUpType>();

  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);

  const closeModal = () => {
    setIsOpenCreateBoardModal(false);
  };

  const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(e.target.value));
  };

  const columnConfirm = (data: PopUpType) => {
    dispatch(createColumn({ title: data.title, order: columnLength, boardId: id as string }));
    dispatch(toggleColumn());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setOrder(0));
    dispatch(increaseColumnCount());
  };

  const columnCancel = () => {
    dispatch(toggleColumn());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setOrder(0));
  };

  const taskConfirm = (data: PopUpType) => {
    dispatch(
      createTask({
        title: data.title,
        order: tasksLength[columnId],
        columnId: columnId,
        description: data.description,
        color: color,
        userId: userId as string,
        users: [userId as string],
        boardId: id as string,
      })
    );
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
    dispatch(increaseTasksCount(columnId));
  };

  const taskCancel = () => {
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
  };

  const columnChangeConfirm = (data: PopUpType) => {
    const updatedColumn = {
      title: data.title,
      order: order,
      boardId: id as string,
      _id: columnId,
    };

    dispatch(toggleColumnChange());
    dispatch(toggleModal());
    dispatch(updateColumn(updatedColumn));
    dispatch(updateSpecialColumn(updatedColumn));
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setOrder(0));
  };

  const columnChangeCancel = () => {
    dispatch(toggleColumnChange());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setOrder(0));
  };

  const taskChangeConfirm = (data: PopUpType) => {
    const updatedTask = {
      title: data.title,
      order: order,
      columnId: columnId,
      description: data.description,
      color: color,
      userId: userId as string,
      users: [userId as string],
      boardId: id as string,
      _id: taskId,
    };

    dispatch(updateTasks(updatedTask));
    dispatch(updateSpecialTask(updatedTask));
    dispatch(toggleTaskChange());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(resetTaskId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
  };

  const taskChangeCancel = () => {
    dispatch(toggleTaskChange());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(resetTaskId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.popup}>
          <form className={styles.newColumnModal} onSubmit={handleSubmit(columnConfirm)}>
            <h2 className={styles.modalHeading}>{textData.boardsPage.newColumn[language]}</h2>
            <Controller
              name="title"
              control={control}
              rules={{
                required: '1',
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextInputForm
                  onChangeText={onChange}
                  value={value}
                  error={!error?.message ? '' : textData.errors.required[language]}
                  type={'text'}
                  label={textData.boardsPage.title[language]}
                  placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
                />
              )}
            />
            <div className={styles.btnsWrapper}>
              <ConfirmButton
                disabled={!isDirty || !!Object.keys(errors).length}
                name={textData.general.confirmModal.confirmButton[language]}
              />
              <CancelButton
                handleClick={columnCancel}
                name={textData.general.confirmModal.cancelButton[language]}
              />
            </div>
          </form>
          {isColumnModalOpen && (
            <form className={styles.newColumnModal} onSubmit={handleSubmit(columnConfirm)}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.newColumn[language]}</h2>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: '1',
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInputForm
                    onChangeText={onChange}
                    value={value}
                    error={!error?.message ? '' : textData.errors.required[language]}
                    type={'text'}
                    label={textData.boardsPage.title[language]}
                    placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
                  />
                )}
              />
              <div className={styles.btnsWrapper}>
                <ConfirmButton
                  disabled={!isDirty || !!Object.keys(errors).length}
                  name={textData.general.confirmModal.confirmButton[language]}
                />
                <CancelButton
                  handleClick={columnCancel}
                  name={textData.general.confirmModal.cancelButton[language]}
                />
              </div>
            </form>
          )}
          {isTaskModalOpen && (
            <form className={styles.newTaskModal} onSubmit={handleSubmit(taskConfirm)}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.newTask[language]}</h2>
              <div className={styles.modalInputsWrapper}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: '1',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextInputForm
                      onChangeText={onChange}
                      value={value}
                      error={!error?.message ? '' : textData.errors.required[language]}
                      type={'text'}
                      label={textData.boardsPage.title[language]}
                      placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: '1',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextInputForm
                      onChangeText={onChange}
                      value={value}
                      error={!error?.message ? '' : textData.errors.required[language]}
                      type={'text'}
                      label={textData.boardsPage.description[language]}
                      placeholder={
                        textData.boardsPage.createBoard.inputDescription.placeholder[language]
                      }
                    />
                  )}
                />
                <ColorInputForm
                  onChangeColor={colorHandler}
                  value={color}
                  label={textData.boardsPage.taskColor[language]}
                />
              </div>
              <div className={styles.btnsWrapper}>
                <ConfirmButton
                  disabled={!isDirty || !!Object.keys(errors).length}
                  name={textData.general.confirmModal.confirmButton[language]}
                />
                <CancelButton
                  handleClick={taskCancel}
                  name={textData.general.confirmModal.cancelButton[language]}
                />
              </div>
            </form>
          )}
          {isChangeColumnModalOpen && (
            <form className={styles.newChangeModal} onSubmit={handleSubmit(columnChangeConfirm)}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.changeTask[language]}</h2>
              <div className={styles.modalInputsWrapper}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: '1',
                  }}
                  defaultValue={title}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextInputForm
                      onChangeText={onChange}
                      value={value}
                      error={!error?.message ? '' : textData.errors.required[language]}
                      type={'text'}
                      label={textData.boardsPage.title[language]}
                      placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
                    />
                  )}
                />
              </div>
              <div className={styles.btnsWrapper}>
                <ConfirmButton
                  disabled={!isDirty || !!Object.keys(errors).length}
                  name={textData.general.confirmModal.confirmButton[language]}
                />
                <CancelButton
                  handleClick={columnChangeCancel}
                  name={textData.general.confirmModal.cancelButton[language]}
                />
              </div>
            </form>
          )}
          {isChangeTaskModalOpen && (
            <form className={styles.newChangeModal} onSubmit={handleSubmit(taskChangeConfirm)}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.changeTask[language]}</h2>
              <div className={styles.modalInputsWrapper}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: '1',
                  }}
                  defaultValue={title}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextInputForm
                      onChangeText={onChange}
                      value={value}
                      error={!error?.message ? '' : textData.errors.required[language]}
                      type={'text'}
                      label={textData.boardsPage.title[language]}
                      placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: '1',
                  }}
                  defaultValue={description}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextInputForm
                      onChangeText={onChange}
                      value={value}
                      error={!error?.message ? '' : textData.errors.required[language]}
                      type={'text'}
                      label={textData.boardsPage.description[language]}
                      placeholder={
                        textData.boardsPage.createBoard.inputDescription.placeholder[language]
                      }
                    />
                  )}
                />
                <ColorInputForm
                  onChangeColor={colorHandler}
                  value={color}
                  label={textData.boardsPage.taskColor[language]}
                />
              </div>
              <div className={styles.btnsWrapper}>
                <ConfirmButton
                  disabled={!isDirty || !!Object.keys(errors).length}
                  name={textData.general.confirmModal.confirmButton[language]}
                />
                <CancelButton
                  handleClick={taskChangeCancel}
                  name={textData.general.confirmModal.cancelButton[language]}
                />
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default PopUp;
