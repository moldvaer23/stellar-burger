import { FC, useEffect, useMemo } from 'react';

import { TIngredient } from '@utils-types';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';

import { useParams } from 'react-router-dom';
import {
  getOrderByNumberThunk,
  getOrderModalData
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const orderData = useSelector(getOrderModalData);
  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();

  const url = useParams();
  const urlNumber = url.number;

  useEffect(() => {
    dispatch(getOrderByNumberThunk(Number(urlNumber)));
  }, []);

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
