import { FC, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { TIngredient, TOrder } from '@utils-types';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getFeedOrderActiveUrl } from '../../services/slices/feedsSlice';

export const OrderInfo: FC = () => {
  const orderData = useSelector(getFeedOrderActiveUrl);
  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
