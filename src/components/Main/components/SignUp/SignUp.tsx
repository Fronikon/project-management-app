import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import { signUp } from '../../../../api/authApi';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((store) => store.language.value);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<SignUpType>();

  const onSubmit = async (user: SignUpType) => {
    console.log(user);
    dispatch(signUp(user));
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
            required: `${textData.errors.required[language]}`,
            minLength: {
              value: 3,
              message: `${textData.errors.loginError[language]}`,
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
            required: `${textData.errors.required[language]}`,
            minLength: {
              value: 3,
              message: `${textData.errors.loginError[language]}`,
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
            required: `${textData.errors.required[language]}`,
            minLength: {
              value: 6,
              message: `${textData.errors.passwordError[language]}`,
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
