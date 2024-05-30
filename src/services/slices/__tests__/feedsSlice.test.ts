import { feedsReducer, getFeedsThunk } from '../feedsSlice';
import { expect } from '@jest/globals';

describe('[Slice]: Feeds', () => {
  const initialState = {
    error: null,
    isLoading: false,
    orders: [],
    feed: {
      total: 0,
      totalToday: 0
    }
  };

  test('[test]: экшен getFeedsThunk.pending', () => {
    const newState = feedsReducer(initialState, getFeedsThunk.pending(''));

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('[test]: экшен getFeedsThunk.rejected', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = feedsReducer(
      initialState,
      getFeedsThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      error: error
    });
  });

  test('[test]: экшен getFeedsThunk.fulfilled', () => {
    /* Тестовый ответ на запрос */
    const response = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['1', '1', '1'],
          status: '1',
          name: '1',
          createdAt: '1',
          updatedAt: '1',
          number: 1
        }
      ],
      total: 1,
      totalToday: 1
    };

    const newState = feedsReducer(
      initialState,
      getFeedsThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialState,
      orders: response.orders,
      feed: {
        total: 1,
        totalToday: 1
      }
    });
  });
});
