import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import modalStyles from '../../../../componentsUtils/Modal/Modal.module.css';
import { signUp } from '../../../../api/authApi';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import Modal from '../../../../componentsUtils/Modal/Modal';
import { cleanError } from '../../../../store/slices/sliceErrorAndLoading';
import Loader from '../../../../componentsUtils/Loader/Loader';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((store) => store.language.value);
  const navigate = useNavigate();
  const error = useAppSelector((store) => store.errorAndLoadingReducer.error);
  const isLoading = useAppSelector((store) => store.errorAndLoadingReducer.isLoading);
  const [isModal, setIsModal] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<SignUpType>();

  const onSubmit = async (user: SignUpType) => {
    const response = await dispatch(signUp(user));
    if (typeof response.payload !== 'string') navigate('/signIn');
  };

  const closeModal = () => {
    setIsModal(false);
    dispatch(cleanError());
  };

  useEffect(() => {
    if (error) setIsModal(true);
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
        <h3 className={formsStyles.title}>{textData.header.signUp[language]}</h3>

        <div className={styles.fields}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: '1',
              minLength: {
                value: 3,
                message: '2',
              },
            }}
            defaultValue={''}
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
          <ConfirmButton disabled={!isDirty || !!Object.keys(errors).length} />
        </div>

        {isModal && (
          <Modal closeModal={closeModal}>
            <div className={modalStyles.modalWrapper}>
              <h2>{error}</h2>
            </div>
          </Modal>
        )}
      </form>
      {isLoading && <Loader />}
    </>
  );
};

export default SignUp;
