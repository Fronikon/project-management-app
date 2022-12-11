import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './Main.module.css';
import { Boards, Board, PageNotFound, SignIn, SignUp, Welcome, Edit } from './components/index';
import useToken from '../../hooks/useToken';
import PrivateRoute from '../../componentsUtils/PrivateRoute/PrivateRoute';
import Loader from '../../componentsUtils/Loader/Loader';

const Main: FC = () => {
  const token = useToken();

  return (
    <main className={styles.main}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route element={<PrivateRoute path="/boards" isAllowed={!token} />}>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Route>
          <Route element={<PrivateRoute isAllowed={!!token} />}>
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:id" element={<Board />} />
            <Route path="/edit" element={<Edit />} />
          </Route>
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
