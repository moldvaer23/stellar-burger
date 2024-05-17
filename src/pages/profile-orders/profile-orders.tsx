import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  getProfileOrdersThunk
} from '../../services/slices/profileSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getProfileOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
