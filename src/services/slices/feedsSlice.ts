import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

type TInitialState = {
  error: SerializedError | null;
  isLoading: boolean;
  orderData: TOrder;
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
};

const initialState: TInitialState = {
  error: null,
  isLoading: false,
  orders: [],
  orderData: {
    _id: '',
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    status: '',
    updatedAt: 'string'
  },
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const getFeedsThunk = createAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  selectors: {
    getFeed: (state) => state.feed,
    getFeedOrders: (state) => state.orders,
    getFeedOrderActiveUrl: (state) => {
      const url = useParams();
      const urlNumber = url.number;

      if (urlNumber) {
        /* Получаем заказ по номеру */
        const index = state.orders.findIndex(
          (item) => item.number === Number(urlNumber)
        );

        /* Если нашли индекс то возвращаем заказ */
        if (index !== -1) {
          return state.orders[index];
        } else {
          return null;
        }
      }

      return null;
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      });
  }
});

export const { getFeedOrders, getFeed, getFeedOrderActiveUrl } =
  feedsSlice.selectors;

export const feedsReducer = feedsSlice.reducer;
