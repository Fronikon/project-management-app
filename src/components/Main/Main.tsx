import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './Main.module.css';
import { Boards, Board, PageNotFound, SignIn, SignUp, Welcome } from './components/index';
import { useAppSelector } from '../../hooks/reduxHooks';

const Main: FC = () => {
  const token = useAppSelector((store) => store.authReducer.token);

  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {token ? (
          <Route path="/signIn" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="/signIn" element={<SignIn />} />
        )}
        {token ? (
          <Route path="/signUp" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="/signUp" element={<SignUp />} />
        )}
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  );
};

export default Main;
