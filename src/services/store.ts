import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook
} from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice';
import { feedsReducer } from './slices/feedsSlice';
import { orderReducer } from './slices/orderSlice';
import { profileReducer } from './slices/profileSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  profile: profileReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
