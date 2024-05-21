import { v4 as uuid4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  burgerConstructor: {
    bun: {
      _id: string;
    };
    ingredients: TIngredient[];
  };
};

const initialState: TInitialState = {
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

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  selectors: {
    getBurgerConstructorItems: (state) => state.constructorItems,
    getBurgerConstructor: (state) => state.burgerConstructor
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        /* Если тип добавляемого ингредиента это bun то добавляем именно в bun */
        /* Иначе пушим в ингредиенты */
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
          state.burgerConstructor.bun._id = action.payload._id;
        } else {
          state.constructorItems.ingredients.push(action.payload);
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexItems = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload
      );

      const indexBurger = state.burgerConstructor.ingredients.findIndex(
        (item) =>
          item._id === state.constructorItems.ingredients[indexItems]._id
      );

      if (indexItems !== -1 && indexBurger !== -1) {
        state.constructorItems.ingredients.splice(indexItems, 1);
        state.burgerConstructor.ingredients.splice(indexBurger, 1);
      }
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );

      if (index !== -1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );

      if (index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = temp;
      }
    },
    clearConstructor: (state) => {
      state.burgerConstructor = initialState.burgerConstructor;
      state.constructorItems = initialState.constructorItems;
    }
  }
});

export const { getBurgerConstructorItems, getBurgerConstructor } =
  burgerConstructorSlice.selectors;

export const {
  addIngredient,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
