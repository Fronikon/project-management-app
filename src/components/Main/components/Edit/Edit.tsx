import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteUserById, getUser, putUser } from '../../../../api/userApi';
import CancelButton from '../../../../componentsUtils/buttons/CancelButton/CancelButton';
import DeleteButton from '../../../../componentsUtils/buttons/DeleteButton/DeleteButton';
import { logOut } from '../../../../store/slices/sliceAuth';
import Modal from '../../../../componentsUtils/Modal/Modal';
import modalStyles from '../../../../componentsUtils/Modal/Modal.module.css';
import ConfirmAction from '../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import useToken from '../../../../hooks/useToken';
import useUserId from '../../../../hooks/useUserId';
import Loader from '../../../../componentsUtils/Loader/Loader';
import { cleanError } from '../../../../store/slices/sliceErrorAndLoading';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

interface UserResponseType {
  login: string;
  name: string;
  _id: string;
}

const Edit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((store) => store.language.value);
  const isLoading = useAppSelector((store) => store.errorAndLoadingReducer.isLoading);
  const token = useToken();
  const userId = useUserId();
  const error = useAppSelector((store) => store.errorAndLoadingReducer.error);
  const [isModal, setIsModal] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [user, setUser] = useState({ login: '', name: '', _id: '' });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<SignUpType>();

  const confirm = async (user: SignUpType) => {
    const response = await dispatch(putUser({ userId, token, user }));
    if (typeof response.payload !== 'string') navigate(-1);
  };

  const cancel = () => {
    navigate(-1);
  };

  const deleteUser = () => {
    setIsModal(true);
  };

  const closeModalDeleteUser = () => {
    setIsModal(false);
  };

  const closeModalError = () => {
    setIsModalError(false);
    dispatch(cleanError());
  };

  const confirmModal = async () => {
    setIsModal(false);
    await dispatch(deleteUserById({ userId, token }));
    dispatch(logOut());
    navigate('/');
  };

  const cancelModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (error) setIsModalError(true);
  }, [error]);

  useEffect(() => {
    (async () => {
      const temp = (await dispatch(getUser({ userId, token }))).payload as UserResponseType;
      setUser(temp);
      reset({ name: temp.name, login: temp.login });
    })();
  }, [dispatch, reset, token, userId]);

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModalDeleteUser}>
          <ConfirmAction
            question={textData.authPage.deleteUser[language]}
            confirm={confirmModal}
            cancel={cancelModal}
          />
        </Modal>
      )}

      <form onSubmit={handleSubmit(confirm)} className={formsStyles.form}>
        <h3 className={formsStyles.title}>{textData.header.edit[language]}</h3>

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
            defaultValue={user.name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInputForm
                onChangeText={onChange}
                value={value}
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
            defaultValue={user.login}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInputForm
                onChangeText={onChange}
                value={value}
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
            name={textData.boardsPage.editBoard.confirmButton[language]}
            disabled={!isDirty || !!Object.keys(errors).length}
          />
          <CancelButton
            name={textData.boardsPage.createBoard.cancelButton[language]}
            handleClick={cancel}
          />
          <DeleteButton
            name={textData.boardsPage.createBoard.deleteButton[language]}
            handleClick={deleteUser}
          />
        </div>

        {isModalError && (
          <Modal closeModal={closeModalError}>
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

export default Edit;
