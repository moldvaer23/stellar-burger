import { expect } from '@jest/globals';
import {
  getOrderByNumberThunk,
  orderBurgerThunk,
  orderReducer
} from '../orderSlice';

describe('[Slice]: Order', () => {
  const initialState = {
    name: '',
    orderModalData: null,
    orderData: null,
    orderRequest: false
  };

  const initialOrderData = ['1', '2', '3'];

  /* Тесты экшена покупки бургера */
  test('[test]: экшен orderBurgerThunk.pending', () => {
    const newState = orderReducer(
      initialState,
      orderBurgerThunk.pending('', initialOrderData)
    );

    expect(newState).toEqual({
      ...initialState,
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
      initialState,
      orderBurgerThunk.fulfilled(response, '', initialOrderData)
    );

    expect(newState).toEqual({
      ...initialState,
      orderData: response.order,
      name: response.name
    });
  });

  /* Тесты экшена получения заказа по номеру */
  test('[test]: экшен getOrderByNumberThunk.pending', () => {
    const newState = orderReducer(
      initialState,
      getOrderByNumberThunk.pending('', 1)
    );

    expect(newState).toEqual({
      ...initialState
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
      initialState,
      getOrderByNumberThunk.fulfilled(response, '', 1)
    );

    expect(newState).toEqual({
      ...initialState,
      orderModalData: response.orders[0]
    });
  });
});
