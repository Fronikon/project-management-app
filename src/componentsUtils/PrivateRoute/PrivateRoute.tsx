import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PropsType {
  children?: ReactNode;
  isAllowed: boolean;
  path?: string;
}

const PrivateRoute: FC<PropsType> = ({ children, isAllowed, path = '/' }) => {
  if (!isAllowed) {
    return <Navigate to={path} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default PrivateRoute;
