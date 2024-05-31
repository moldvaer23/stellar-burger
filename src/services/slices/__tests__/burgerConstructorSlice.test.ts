import { expect } from '@jest/globals';

import {
  addIngredient,
  burgerConstructorReducer,
  initialStateBurgerConstructor,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../burgerConstructorSlice';

describe('[Slice]: BurgerConstructor', () => {
  const initIngredient = {
    _id: '1',
    name: '1',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '1',
    image_mobile: '1',
    image_large: '1'
  };

  test('[test]: Обработка экшена добавления ингредиента', () => {
    /* Получаем состояние и добавляем ингредиент*/
    const newState = burgerConstructorReducer(
      initialStateBurgerConstructor,
      addIngredient(initIngredient)
    );

    const { constructorItems } = newState;

    /* Расширяем ингредиент т.к при добавлении генерируется уникальный Id */
    const expectedIngredient = {
      ...initIngredient,
      id: constructorItems.ingredients[0].id
    };

    expect(constructorItems.ingredients).toEqual([expectedIngredient]);
  });

  test('[test]: Обработка экшена удаления ингредиента', () => {
    /* Состояние с уже добавленным ингредиентом */
    const expectedItem = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            ...initIngredient,
            id: '1'
          }
        ]
      },
      burgerConstructor: {
        bun: {
          _id: ''
        },
        ingredients: [initIngredient]
      }
    };

    /* Получаем состояние и удаляем ингредиент */
    const newState = burgerConstructorReducer(
      expectedItem,
      removeIngredient(expectedItem.constructorItems.ingredients[0].id)
    );

    const { constructorItems } = newState;
    expect(constructorItems.ingredients.length).toBe(0);
  });

  test('[test]: Обработка экшена перемещения ингредиента в низ на 1 позицию', () => {
    const initialConstructorItem = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            ...initIngredient,
            _id: '1',
            id: '1'
          },
          {
            ...initIngredient,
            _id: '2',
            id: '2'
          },
          {
            ...initIngredient,
            _id: '3',
            id: '3'
          }
        ]
      },
      burgerConstructor: {
        bun: {
          _id: ''
        },
        ingredients: [
          initIngredient,
          { ...initIngredient, _id: '2' },
          { ...initIngredient, _id: '3' }
        ]
      }
    };

    /* Получаем состояние и перемещаем ингредиент c id 1 в низ на 1 позицию */
    const newState = burgerConstructorReducer(
      initialConstructorItem,
      moveIngredientDown(
        initialConstructorItem.constructorItems.ingredients[0].id
      )
    );

    const { constructorItems } = newState;
    expect(constructorItems.ingredients).toEqual([
      { ...initIngredient, _id: '2', id: '2' },
      { ...initIngredient, _id: '1', id: '1' },
      { ...initIngredient, _id: '3', id: '3' }
    ]);
  });

  test('[test]: Обработка экшена перемещения ингредиента вверх на 1 позицию', () => {
    const initialConstructorItem = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            ...initIngredient,
            _id: '1',
            id: '1'
          },
          {
            ...initIngredient,
            _id: '2',
            id: '2'
          },
          {
            ...initIngredient,
            _id: '3',
            id: '3'
          }
        ]
      },
      burgerConstructor: {
        bun: {
          _id: ''
        },
        ingredients: [
          initIngredient,
          { ...initIngredient, _id: '2' },
          { ...initIngredient, _id: '3' }
        ]
      }
    };

    /* Получаем состояние и перемещаем ингредиент c id 3 вверх на 1 позицию */
    const newState = burgerConstructorReducer(
      initialConstructorItem,
      moveIngredientUp(
        initialConstructorItem.constructorItems.ingredients[2].id
      )
    );

    const { constructorItems } = newState;
    expect(constructorItems.ingredients).toEqual([
      { ...initIngredient, _id: '1', id: '1' },
      { ...initIngredient, _id: '3', id: '3' },
      { ...initIngredient, _id: '2', id: '2' }
    ]);
  });
});
