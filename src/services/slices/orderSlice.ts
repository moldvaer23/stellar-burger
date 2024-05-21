import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearConstructor } from './burgerConstructorSlice';

type TInitialState = {
  name: string;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
  orderRequest: boolean;
};

const initialState: TInitialState = {
  name: '',
  orderModalData: null,
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

export const getOrderByNumberThunk = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (data: number) => await getOrderByNumberApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderData: (state) => state.orderData,
    getOrderModalData: (state) => state.orderModalData
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
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderModalData = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload?.orders[0];
      });
  }
});

export const { getOrderData, getOrderRequest, getOrderModalData } =
  orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
