import { expect } from '@jest/globals';
import {
  getIngredientsThunk,
  ingredientsReducer,
  initialStateIngredients
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('[Slice]: Ingredients', () => {
  const initialIngredient = {
    _id: '1',
    name: '1',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '1',
    image_mobile: '1',
    image_large: '1'
  };

  test('[test]: экшен getIngredientsThunk.pending', () => {
    const newState = ingredientsReducer(
      initialStateIngredients,
      getIngredientsThunk.pending('')
    );

    expect(newState).toEqual({
      ...initialStateIngredients,
      isLoading: true
    });
  });

  test('[test]: экшен getIngredientsThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = ingredientsReducer(
      initialStateIngredients,
      getIngredientsThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialStateIngredients,
      error: error
    });
  });

  test('[test]: экшен getIngredientsThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response: TIngredient[] = [
      {
        ...initialIngredient
      },
      {
        ...initialIngredient,
        _id: '2',
        type: 'main'
      },
      {
        ...initialIngredient,
        _id: '3',
        type: 'sauce'
      }
    ];

    const newState = ingredientsReducer(
      initialStateIngredients,
      getIngredientsThunk.fulfilled(response, '')
    );

    /* Смотрим что ингредиенты добавлены и расфасованы в нужные массивы */
    expect(newState).toEqual({
      ...initialStateIngredients,
      ingredients: response,
      buns: [response[0]],
      mains: [response[1]],
      sauces: [response[2]]
    });
  });
});
