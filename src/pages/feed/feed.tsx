import { FC } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders, getFeedsThunk } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
