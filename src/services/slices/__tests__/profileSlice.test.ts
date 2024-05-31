import { expect } from '@jest/globals';
import {
  getProfileOrdersThunk,
  initialStateProfile,
  profileReducer
} from '../profileSlice';
import { TOrder } from '@utils-types';

describe('[Slice]: Profile', () => {
  test('[test]: экшен getProfileOrdersThunk.pending', () => {
    const newState = profileReducer(
      initialStateProfile,
      getProfileOrdersThunk.pending('')
    );

    expect(newState).toEqual({
      ...initialStateProfile,
      isLoading: true
    });
  });

  test('[test]: экшен getProfileOrdersThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = profileReducer(
      initialStateProfile,
      getProfileOrdersThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialStateProfile,
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
      initialStateProfile,
      getProfileOrdersThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialStateProfile,
      orders: response
    });
  });
});
