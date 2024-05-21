import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

type TInitialState = {
  error: SerializedError | null;
  isLoading: boolean;
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
    getFeedOrders: (state) => state.orders
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

export const { getFeedOrders, getFeed } = feedsSlice.selectors;

export const feedsReducer = feedsSlice.reducer;
