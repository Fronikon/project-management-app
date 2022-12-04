import React, { FC } from 'react';
import styles from './EditBoardForm.module.css';
import formsStyles from '../forms.module.css';
import { useForm, Controller } from 'react-hook-form';
import ConfirmButton from '../../buttons/ConfirmButton/ConfirmButton';
import CancelButton from '../../buttons/CancelButton/CancelButton';
import TextInputForm from '../../customInputsForm/TextInputForm/TextInputForm';
import ColorInputForm from '../../customInputsForm/ColorInputForm/ColorInputForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { editBoardTAC } from '../../../store/reducers/boardsReducer';
import textData from '../../../data/textData';
import { BoardType } from './../../../types/boardsTypes';

interface PropsType {
  closeModal: () => void;
  board: BoardType;
}

interface FieldValuesType {
  title: string;
  description: string;
  color: string;
}

const EditBoardForm: FC<PropsType> = ({ closeModal, board }) => {
  const language = useAppSelector((store) => store.language.value);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FieldValuesType>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValuesType): void => {
    const { title, description, color } = data;
    const boardData = {
      ...board,
      title,
      description,
      color,
    };

    dispatch(editBoardTAC({ board: boardData }));

    closeModal();
  };

  const editBoardText = textData.boardsPage.editBoard;
  const createBoardText = textData.boardsPage.createBoard;
  const inputTitleText = createBoardText.inputTitle;
  const inputDescriptionText = createBoardText.inputDescription;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
      <h3 className={formsStyles.title}>{editBoardText.title[language]}</h3>

      <div className={styles.fields}>
        <Controller
          name="title"
          control={control}
          rules={{ required: inputTitleText.requiredError[language] }}
          defaultValue={board.title}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value}
              error={error?.message}
              label={inputTitleText.label[language]}
              type={'text'}
              placeholder={inputTitleText.placeholder[language]}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: inputDescriptionText.requiredError[language] }}
          defaultValue={board.description}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value}
              error={error?.message}
              type={'text'}
              label={inputDescriptionText.label[language]}
              placeholder={inputDescriptionText.placeholder[language]}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          defaultValue={board.color || '#EABFFF'}
          render={({ field: { onChange, value } }) => (
            <ColorInputForm
              onChangeColor={onChange}
              value={value}
              label={textData.boardsPage.title[language]}
            />
          )}
        />
      </div>

      <div className={formsStyles.buttons}>
        <ConfirmButton
          name={editBoardText.confirmButton[language]}
          disabled={!isDirty || !!Object.keys(errors).length}
        />
        <CancelButton name={createBoardText.cancelButton[language]} handleClick={closeModal} />
      </div>
    </form>
  );
};

export default EditBoardForm;
