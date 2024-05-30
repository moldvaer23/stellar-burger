import { expect } from '@jest/globals';
import {
  addIngredient,
  burgerConstructorReducer,
  removeIngredient
} from '../burgerConstructorSlice';

describe('[Slice]: BurgerConstructor', () => {
  const initialState = {
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
  };

  const initIngredient = {
    _id: '1',
    name: '1',
    type: '1',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: '1',
    image_mobile: '1',
    image_large: '1'
  };

  test('[test]: Обработка экшена добавления ингредиента', () => {
    /* Получаем состояние и добавляем ингредиент*/
    const newState = burgerConstructorReducer(
      initialState,
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
    const initialConstructorItem = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            ...initIngredient,
            id: 'be3269c5-4f0f-4222-9eba-97191b042055'
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

    /* Получаем состояние и удаляем ингредиент*/
    const newState = burgerConstructorReducer(
      initialConstructorItem,
      removeIngredient(
        initialConstructorItem.constructorItems.ingredients[0].id
      )
    );

    const { constructorItems } = newState;
    expect(constructorItems.ingredients.length).toBe(0);
  });
});
