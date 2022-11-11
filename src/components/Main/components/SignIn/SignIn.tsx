import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from '../../../../api/authApi';
import styles from '../SignUp/SignUp.module.css';

export interface SignInType {
  login: string;
  password: string;
}

const SignIn: FC = () => {
  const [user, setUser] = useState({ login: '', password: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<SignInType>();

  const onSubmit = () => {
    const responce = signIn(user);
    console.log('responce: ', responce);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <form className={styles.signUp__form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.signUp__label}>
        Login
        <input
          className={styles.signUp__input}
          type="text"
          placeholder="Enter your login"
          autoComplete="off"
          {...register('login', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'The login must be at least 2 characters long',
            },
            onChange: onChange,
          })}
        ></input>
      </label>
      <span className={styles.login__error}>{errors.login?.message}</span>

      <label className={styles.signUp__label}>
        Password
        <input
          className={styles.signUp__input}
          type="text"
          placeholder="Enter your password"
          autoComplete="off"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'The password must be at least 6 characters long',
            },
            onChange: onChange,
          })}
        ></input>
      </label>
      <span className={styles.login__error}>{errors.password?.message}</span>

      <button
        className={styles.login__button}
        type="submit"
        // disabled={!isName || !isEmail || !isPassword}
      >
        Submit
      </button>
    </form>
  );
};

export default SignIn;
