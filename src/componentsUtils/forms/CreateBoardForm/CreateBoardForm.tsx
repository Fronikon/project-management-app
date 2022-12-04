import React, { FC } from 'react';
import styles from './CreateBoardForm.module.css';
import formsStyles from '../forms.module.css';
import { useForm, Controller } from 'react-hook-form';
import ConfirmButton from '../../buttons/ConfirmButton/ConfirmButton';
import CancelButton from '../../buttons/CancelButton/CancelButton';
import TextInputForm from '../../customInputsForm/TextInputForm/TextInputForm';
import ColorInputForm from '../../customInputsForm/ColorInputForm/ColorInputForm';
import { useAppDispatch, useAppSelector } from './../../../hooks/reduxHooks';
import { addBoardTAC } from '../../../store/reducers/boardsReducer';
import textData from '../../../data/textData';

interface PropsType {
  closeModal: () => void;
}

interface FieldValuesType {
  title: string;
  description: string;
  color: string;
}

const CreateBoardForm: FC<PropsType> = ({ closeModal }) => {
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FieldValuesType>();

  const onSubmit = (data: FieldValuesType): void => {
    const { title, description, color } = data;
    const boardData = {
      title,
      description,
      color,
      owner: 'string', // owner id
      users: [],
    };

    dispatch(addBoardTAC({ board: boardData }));
    closeModal();
  };

  const createBoardText = textData.boardsPage.createBoard;
  const inputTitleText = createBoardText.inputTitle;
  const inputDescriptionText = createBoardText.inputDescription;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
      <h3 className={formsStyles.title}>{createBoardText.title[language]}</h3>

      <div className={styles.fields}>
        <Controller
          name="title"
          control={control}
          rules={{ required: inputTitleText.requiredError[language] }}
          defaultValue={''}
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
          defaultValue={''}
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
          defaultValue={'#EABFFF'}
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
          name={createBoardText.confirmButton[language]}
          disabled={!isDirty || !!Object.keys(errors).length}
        />
        <CancelButton name={createBoardText.cancelButton[language]} handleClick={closeModal} />
      </div>
    </form>
  );
};

export default CreateBoardForm;
