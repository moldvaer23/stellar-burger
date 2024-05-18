import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  getProfileOrdersThunk
} from '../../services/slices/profileSlice';
import { getFeedsThunk } from '../../services/slices/feedsSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getProfileOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getProfileOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
