import { FC } from 'react';

import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutUserThunk());

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
