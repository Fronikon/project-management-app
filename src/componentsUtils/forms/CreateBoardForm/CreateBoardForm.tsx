import React, { FC } from 'react';
import styles from './CreateBoardForm.module.css';
import formsStyles from '../forms.module.css';
import { useForm, Controller } from 'react-hook-form';
import ConfirmButton from '../../buttons/ConfirmButton/ConfirmButton';
import CancelButton from '../../buttons/CancelButton/CancelButton';
import TextInputForm from '../../customInputsForm/TextInputForm/TextInputForm';
import ColorInputForm from '../../customInputsForm/ColorInputForm/ColorInputForm';
import { useAppDispatch } from './../../../hooks/reduxHooks';
import { addBoardTAC } from '../../../store/reducers/boardsReducer';

interface PropsType {
  closeModal: () => void;
}

interface FieldValuesType {
  title: string;
  description: string;
  color: string;
}

const CreateBoardForm: FC<PropsType> = ({ closeModal }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FieldValuesType>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValuesType): void => {
    dispatch(
      addBoardTAC({
        title: data.title,
        description: data.description,
        owner: 'string', // owner id
        users: [],
      })
    );
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
      <h3 className={formsStyles.title}>Create board</h3>

      <div className={styles.fields}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Please enter title.' }}
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value}
              error={error?.message}
              label={'Title'}
              type={'text'}
              placeholder={'Enter title..'}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value}
              type={'text'}
              label={'Description'}
              placeholder={'Enter description..'}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          defaultValue={'#EABFFF'}
          render={({ field: { onChange, value } }) => (
            <ColorInputForm onChangeColor={onChange} value={value} />
          )}
        />
      </div>

      <div className={formsStyles.buttons}>
        <ConfirmButton disabled={!isDirty || !!Object.keys(errors).length} />
        <CancelButton handleClick={closeModal} />
      </div>
    </form>
  );
};

export default CreateBoardForm;
