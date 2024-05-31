import { expect } from '@jest/globals';
import {
  getOrderByNumberThunk,
  initialStateOrder,
  orderBurgerThunk,
  orderReducer
} from '../orderSlice';

describe('[Slice]: Order', () => {
  const initialOrderData = ['1', '2', '3'];

  /* Тесты экшена покупки бургера */
  test('[test]: экшен orderBurgerThunk.pending', () => {
    const newState = orderReducer(
      initialStateOrder,
      orderBurgerThunk.pending('', initialOrderData)
    );

    expect(newState).toEqual({
      ...initialStateOrder,
      orderRequest: true
    });
  });

  test('[test]: экшен getIngredientsThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      success: true,
      name: '1',
      order: {
        ingredients: ['1', '1', '2'],
        _id: '1',
        owner: {
          name: '1',
          email: '1',
          createdAt: '1',
          updatedAt: '1'
        },
        status: '1',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1,
        price: 1
      }
    };

    const newState = orderReducer(
      initialStateOrder,
      orderBurgerThunk.fulfilled(response, '', initialOrderData)
    );

    expect(newState).toEqual({
      ...initialStateOrder,
      orderData: response.order,
      name: response.name
    });
  });

  /* Тесты экшена получения заказа по номеру */
  test('[test]: экшен getOrderByNumberThunk.pending', () => {
    const newState = orderReducer(
      initialStateOrder,
      getOrderByNumberThunk.pending('', 1)
    );

    expect(newState).toEqual({
      ...initialStateOrder
    });
  });

  test('[test]: экшен getOrderByNumberThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      success: true,
      orders: [
        {
          ingredients: ['1', '1', '2'],
          _id: '1',
          owner: {
            name: '1',
            email: '1',
            createdAt: '1',
            updatedAt: '1'
          },
          status: '1',
          name: '1',
          createdAt: '1',
          updatedAt: '1',
          number: 1,
          price: 1
        }
      ]
    };

    const newState = orderReducer(
      initialStateOrder,
      getOrderByNumberThunk.fulfilled(response, '', 1)
    );

    expect(newState).toEqual({
      ...initialStateOrder,
      orderModalData: response.orders[0]
    });
  });
});
