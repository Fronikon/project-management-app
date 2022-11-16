import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import { signUp } from '../../../../api/authApi';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../data/textData';
import { useAppSelector } from '../../../../hooks/reduxHooks';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

const SignUp: FC = () => {
  const language = useAppSelector((store) => store.language.value);

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
      <h3 className={formsStyles.title}>{textData.authPage.registration[language]}</h3>

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
              label={textData.authPage.name[language]}
              type={'text'}
              placeholder={textData.authPage.namePlaceholder[language]}
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
              label={textData.authPage.login[language]}
              placeholder={textData.authPage.loginPlaceholder[language]}
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
              label={textData.authPage.password[language]}
              placeholder={textData.authPage.passwordPlaceholder[language]}
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
