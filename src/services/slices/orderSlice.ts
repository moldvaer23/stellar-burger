import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearConstructor } from './burgerConstructorSlice';

type TInitialState = {
  name: string;
  orderData: TOrder | null;
  orderRequest: boolean;
};

const initialState: TInitialState = {
  name: '',
  orderData: null,
  orderRequest: false
};

export const orderBurgerThunk = createAsyncThunk(
  'order/buyBurger',
  async (data: string[], { dispatch }) =>
    await orderBurgerApi(data).then((res) => {
      /* Если заказ прошел успешно то чистим конструктор */
      if (res.success) dispatch(clearConstructor());

      return res;
    })
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderData: (state) => state.orderData
  },
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.name = '';
    }
  },
  extraReducers: (build) => {
    build
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const { getOrderData, getOrderRequest } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
