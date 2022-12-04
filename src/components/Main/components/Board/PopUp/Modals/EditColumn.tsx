import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { updateColumn } from '../../../../../../api/columnApi';
import CancelButton from '../../../../../../componentsUtils/buttons/CancelButton/CancelButton';
import ConfirmButton from '../../../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import {
  resetColumnId,
  setOrder,
  setTitle,
  toggleColumnChange,
  toggleModal,
  updateSpecialColumn,
} from '../../../../../../store/reducers/boardReducer';
import { PopUpType } from '../PopUp';
import styles from '../PopUp.module.css';

interface PropsType {
  closeModal: () => void;
}

const EditColumn: FC<PropsType> = ({ closeModal }) => {
  const language = useAppSelector((store) => store.language.value);
  const columnId = useAppSelector((store) => store.boardReducer.columnId);
  const title = useAppSelector((store) => store.boardReducer.title);
  const order = useAppSelector((store) => store.boardReducer.order);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<PopUpType>();

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
    closeModal();
  };

  const columnChangeCancel = () => {
    dispatch(toggleColumnChange());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    dispatch(setTitle(''));
    dispatch(setOrder(0));
    closeModal();
  };

  return (
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
  );
};

export default EditColumn;
