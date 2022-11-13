import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import { signUp } from '../../../../api/authApi';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

const SignUp: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<SignUpType>();

  const onSubmit = async (user: SignUpType) => {
    console.log(user);
    const responce = await signUp(user);
    console.log('responce: ', responce);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
      <h3 className={formsStyles.title}>Registration</h3>

      <div className={styles.fields}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Please enter your name.',
            minLength: {
              value: 3,
              message: 'The name must be at least 3 characters long.',
            },
          }}
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value || ''}
              error={error?.message}
              label={'Name'}
              type={'text'}
              placeholder={'Enter name..'}
            />
          )}
        />

        <Controller
          name="login"
          control={control}
          rules={{
            required: 'Please enter your login.',
            minLength: {
              value: 3,
              message: 'The name must be at least 3 characters long.',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value || ''}
              error={error?.message}
              type={'text'}
              label={'Login'}
              placeholder={'Enter login..'}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Please enter your password.',
            minLength: {
              value: 6,
              message: 'The name must be at least 6 characters long.',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value || ''}
              error={error?.message}
              type={'text'}
              label={'Password'}
              placeholder={'Enter password..'}
            />
          )}
        />
      </div>

      <div className={formsStyles.buttons}>
        <ConfirmButton disabled={!isDirty || !!Object.keys(errors).length} />
      </div>
    </form>
  );
};

export default SignUp;
