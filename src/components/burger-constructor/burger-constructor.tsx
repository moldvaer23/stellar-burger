import { FC, useMemo } from 'react';

import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { getUserIsAuth } from '../../services/slices/userSlice';
import { getBurgerConstructorItems } from '../../services/slices/burgerConstructorSlice';
import {
  clearOrder,
  getOrderData,
  getOrderRequest,
  orderBurgerThunk
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getBurgerConstructorItems);
  const isAuth = useSelector(getUserIsAuth);
  const orderModalData = useSelector(getOrderData);
  const orderRequest = useSelector(getOrderRequest);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) return navigate('/login');

    const orderData = [];

    orderData.push(constructorItems.bun._id);
    orderData.push(constructorItems.bun._id);

    constructorItems.ingredients.map((item) => orderData.push(item._id));
    dispatch(orderBurgerThunk(orderData));
  };

  const closeOrderModal = () => dispatch(clearOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
