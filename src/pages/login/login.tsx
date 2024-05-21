import { FC, SyntheticEvent, useState } from 'react';

import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import {
  getUserLoginError,
  loginUserThunk
} from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getUserLoginError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({
        email: email,
        password: password
      })
    ).then(() => navigate('/'));
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
