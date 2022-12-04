import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CancelButton from '../../../../../../componentsUtils/buttons/CancelButton/CancelButton';
import ConfirmButton from '../../../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import ColorInputForm from '../../../../../../componentsUtils/customInputsForm/ColorInputForm/ColorInputForm';
import TextInputForm from '../../../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import {
  createTaskTAC,
  increaseTasksCount,
  resetColumnId,
  setColor,
  setDescription,
  setOrder,
  setTitle,
  toggleModal,
  toggleTask,
} from '../../../../../../store/reducers/boardReducer';
import { PopUpType } from '../PopUp';
import styles from '../PopUp.module.css';

interface PropsType {
  closeModal: () => void;
}

const CreateTask: FC<PropsType> = ({ closeModal }) => {
  const language = useAppSelector((store) => store.language.value);
  const columnId = useAppSelector((store) => store.boardReducer.columnId);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const color = useAppSelector((store) => store.boardReducer.color);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<PopUpType>();

  const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(e.target.value));
  };

  const taskConfirm = (data: PopUpType) => {
    const taskData = {
      title: data.title,
      order: tasksLength[columnId],
      columnId: columnId,
      description: data.description,
      color: color,
      userId: userId as string,
      users: [userId as string],
      boardId: id as string,
    };

    dispatch(createTaskTAC({ taskData }));
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
    dispatch(increaseTasksCount(columnId));
    closeModal();
  };

  const taskCancel = () => {
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setColor('#000000'));
    dispatch(setOrder(0));
    closeModal();
  };

  return (
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
              placeholder={textData.boardsPage.createBoard.inputDescription.placeholder[language]}
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
  );
};

export default CreateTask;
