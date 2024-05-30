import { expect } from '@jest/globals';
import { getProfileOrdersThunk, profileReducer } from '../profileSlice';
import { TOrder } from '@utils-types';

describe('[Slice]: Profile', () => {
  const initialState = {
    isLoading: false,
    orders: [],
    ordersRequestError: null,
    total: 0,
    totalToday: 0
  };

  test('[test]: экшен getProfileOrdersThunk.pending', () => {
    const newState = profileReducer(
      initialState,
      getProfileOrdersThunk.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('[test]: экшен getProfileOrdersThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = profileReducer(
      initialState,
      getProfileOrdersThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      ordersRequestError: error
    });
  });

  test('[test]: экшен getProfileOrdersThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response: TOrder[] = [
      {
        _id: '1',
        ingredients: ['1', '2', '3', '4', '5'],
        status: '1',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1
      }
    ];

    const newState = profileReducer(
      initialState,
      getProfileOrdersThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialState,
      orders: response
    });
  });
});
