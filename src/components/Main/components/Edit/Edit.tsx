import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm.module.css';
import formsStyles from '../../../../componentsUtils/forms/forms.module.css';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { parseJwt } from '../../../../data/parseJWT';
import { deleteUserById, getUser, putUser } from '../../../../api/userApi';
import CancelButton from '../../../../componentsUtils/buttons/CancelButton/CancelButton';
import DeleteButton from '../../../../componentsUtils/buttons/DeleteButton/DeleteButton';
import { logOut } from '../../../../store/slices/sliceAuth';

export interface SignUpType {
  name: string;
  login: string;
  password: string;
}

const Edit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((store) => store.language.value);
  const token = useAppSelector((store) => store.authReducer.token);
  const userId = parseJwt(token).id;
  const [user, setUser] = useState({ _id: '', name: '', login: '' });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<SignUpType>();

  const onSubmit = async (user: SignUpType) => {
    const response = await dispatch(putUser({ userId, token, user }));
    if (typeof response.payload !== 'string') navigate(-1);
  };

  const cancel = () => {
    navigate(-1);
  };

  const deleteUser = async () => {
    await deleteUserById({ userId, token });
    localStorage.removeItem('token');
    dispatch(logOut());
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const temp = await getUser({ userId, token });
      setUser(temp);
    })();
  }, [token, userId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formsStyles.form}>
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
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputForm
              onChangeText={onChange}
              value={value || user.name}
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
              value={value || user.login}
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
    </form>
  );
};

export default Edit;
