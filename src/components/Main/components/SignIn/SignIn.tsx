import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import signInStyles from './SignIn.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import Loader from '../../../../componentsUtils/Loader/Loader';
import { signInTAC } from '../../../../store/reducers/authReducer';

export interface SignInType {
  login: string;
  password: string;
}

const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((store) => store.language.value);
  const isLoading = useAppSelector((store) => store.errorAndLoadingReducer.isLoading);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<SignInType>();

  const onSubmit = async (user: SignInType) => {
    await dispatch(signInTAC(user));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
        <h3 className={formsStyles.title}>{textData.header.signIn[language]}</h3>

        <div className={styles.fields}>
          <Controller
            name="login"
            control={control}
            rules={{
              required: '1',
              minLength: {
                value: 3,
                message: '2',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInputForm
                onChangeText={onChange}
                value={value || ''}
                error={
                  !error?.message
                    ? ''
                    : error?.message === '1'
                    ? textData.errors.required[language]
                    : textData.errors.loginError[language]
                }
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
              required: '1',
              minLength: {
                value: 6,
                message: '2',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInputForm
                onChangeText={onChange}
                value={value || ''}
                error={
                  !error?.message
                    ? ''
                    : error?.message === '1'
                    ? textData.errors.required[language]
                    : textData.errors.passwordError[language]
                }
                type={'password'}
                label={textData.authPage.password[language]}
                placeholder={textData.authPage.passwordPlaceholder[language]}
              />
            )}
          />
        </div>

        <div className={formsStyles.buttons}>
          <ConfirmButton
            name={textData.authPage.confirmButtonLogIn[language]}
            disabled={!isDirty || !!Object.keys(errors).length}
          />
        </div>
        <div className={signInStyles.messageWrapper}>
          <p className={signInStyles.message}>{textData.authPage.warning[language]}&thinsp;</p>
          <Link className={signInStyles.link} to="/signUp">
            {textData.authPage.warningLink[language]}
          </Link>
        </div>
      </form>
      {isLoading && <Loader />}
    </>
  );
};

export default SignIn;
