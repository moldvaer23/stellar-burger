import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

type TInitialState = {
  isLoading: boolean;
  orders: TOrder[];
  ordersRequestError: null | SerializedError;
  total: number;
  totalToday: number;
};

export const initialStateProfile: TInitialState = {
  isLoading: false,
  orders: [],
  ordersRequestError: null,
  total: 0,
  totalToday: 0
};

export const getProfileOrdersThunk = createAsyncThunk(
  'profile/getOrders',
  async () => await getOrdersApi()
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialStateProfile,
  selectors: {
    getProfileOrders: (state) => state.orders
  },
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getProfileOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.ordersRequestError = null;
      })
      .addCase(getProfileOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.ordersRequestError = action.error;
      })
      .addCase(getProfileOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { getProfileOrders } = profileSlice.selectors;

export const profileReducer = profileSlice.reducer;
