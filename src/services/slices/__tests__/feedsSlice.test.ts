import { feedsReducer, getFeedsThunk, initialStateFeeds } from '../feedsSlice';
import { expect } from '@jest/globals';

describe('[Slice]: Feeds', () => {
  test('[test]: экшен getFeedsThunk.pending', () => {
    const newState = feedsReducer(initialStateFeeds, getFeedsThunk.pending(''));

    expect(newState).toEqual({
      ...initialStateFeeds,
      isLoading: true
    });
  });

  test('[test]: экшен getFeedsThunk.rejected', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = feedsReducer(
      initialStateFeeds,
      getFeedsThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialStateFeeds,
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
      initialStateFeeds,
      getFeedsThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialStateFeeds,
      orders: response.orders,
      feed: {
        total: 1,
        totalToday: 1
      }
    });
  });
});
