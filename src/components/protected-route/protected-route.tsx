import { FC, ReactElement } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import {
  getUserData,
  getUserIsAuth,
  getUserIsAuthChecked
} from '../../services/slices/userSlice';

type TProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProps> = ({ children, onlyUnAuth }) => {
  const isAuth = useSelector(getUserIsAuth);
  const isAuthChecked = useSelector(getUserIsAuthChecked);
  const location = useLocation();

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
