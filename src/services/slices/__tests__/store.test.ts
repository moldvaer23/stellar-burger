import { expect } from '@jest/globals';

import { rootReducer } from '../../store';
import { initialStateUser } from '../userSlice';
import { initialStateFeeds } from '../feedsSlice';
import { initialStateOrder } from '../orderSlice';
import { initialStateProfile } from '../profileSlice';
import { initialStateIngredients } from '../ingredientsSlice';
import { initialStateBurgerConstructor } from '../burgerConstructorSlice';

describe('[Redux]: RootReducer', () => {
  it('[test]: Начальное состояние при вызове с undefined состоянием и неизвестным экшеном', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const expectedInitialState = {
      burgerConstructor: initialStateBurgerConstructor,
      feeds: initialStateFeeds,
      ingredients: initialStateIngredients,
      order: initialStateOrder,
      profile: initialStateProfile,
      user: initialStateUser
    };

    expect(rootReducer(undefined, unknownAction)).toEqual(expectedInitialState);
  });
});
