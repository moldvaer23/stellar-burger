import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

type TInitialState = {
  buns: TIngredient[];
  error: SerializedError | null;
  ingredients: TIngredient[];
  isLoading: boolean;
  mains: TIngredient[];
  sauces: TIngredient[];
};

export const initialStateIngredients: TInitialState = {
  buns: [],
  error: null,
  ingredients: [],
  isLoading: false,
  mains: [],
  sauces: []
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialStateIngredients,
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsBuns: (state) => state.buns,
    getIngredientsLoading: (state) => state.isLoading,
    getIngredientsMains: (state) => state.mains,
    getIngredientsSauces: (state) => state.sauces,
    getActiveIngredientUrl: (state) => {
      const url = useParams();
      const urlId = url.id;

      if (urlId) {
        /* Ищем ингредиент по его ID */
        const index = state.ingredients.findIndex((item) => item._id === urlId);

        if (index !== -1) {
          /* Если нашли ингредиент то возвращаем его */
          return state.ingredients[index];
        }
        return null;
      }

      return null;
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.ingredients = [];
        state.buns = [];
        state.mains = [];
        state.sauces = [];
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;

        /* Проходим по массиву ингредиентов и маршрутизируем данные */
        action.payload.map((item) => {
          switch (item.type) {
            case 'bun':
              state.buns.push(item);
              return;
            case 'main':
              state.mains.push(item);
              return;
            case 'sauce':
              state.sauces.push(item);
              return;
            default:
              return;
          }
        });
      });
  }
});

export const {
  getActiveIngredientUrl,
  getIngredients,
  getIngredientsBuns,
  getIngredientsLoading,
  getIngredientsMains,
  getIngredientsSauces
} = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
