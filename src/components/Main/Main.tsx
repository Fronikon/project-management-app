import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Boards, Board, PageNotFound, SignIn, SignUp, Welcome } from './components/index';

const Main: FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  );
};

export default Main;
