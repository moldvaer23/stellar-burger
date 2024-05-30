import { rootReducer } from '../../store';
import { expect } from '@jest/globals';

describe('[Redux]: RootReducer', () => {
  it('[test]: Начальное состояние при вызове с undefined состоянием и неизвестным экшеном', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const expectedInitialState = {
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        burgerConstructor: {
          bun: {
            _id: ''
          },
          ingredients: []
        }
      },
      feeds: {
        error: null,
        isLoading: false,
        orders: [],
        feed: {
          total: 0,
          totalToday: 0
        }
      },
      ingredients: {
        buns: [],
        error: null,
        ingredients: [],
        isLoading: false,
        mains: [],
        sauces: []
      },
      order: {
        name: '',
        orderModalData: null,
        orderData: null,
        orderRequest: false
      },
      profile: {
        isLoading: false,
        orders: [],
        ordersRequestError: null,
        total: 0,
        totalToday: 0
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        regUserError: null,
        regUserRequest: false,
        loginUserError: null,
        loginUserRequest: false,
        userData: {
          email: '',
          name: ''
        }
      }
    };

    expect(rootReducer(undefined, unknownAction)).toEqual(expectedInitialState);
  });
});
