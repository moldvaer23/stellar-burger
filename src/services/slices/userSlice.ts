import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

import { deleteCookie, setCookie } from '../../utils/cookie';

type TInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  regUserError: null | SerializedError;
  regUserRequest: boolean;
  loginUserError: null | SerializedError;
  loginUserRequest: boolean;
  userData: {
    email: string;
    name: string;
  };
};

const initialState: TInitialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  regUserError: null,
  regUserRequest: false,
  loginUserError: null,
  loginUserRequest: false,
  userData: {
    email: '',
    name: ''
  }
};

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const reg = await registerUserApi(data);

    if (!reg?.success) {
      return null;
    }

    setCookie('accessToken', reg.accessToken);
    localStorage.setItem('refreshToken', reg.refreshToken);

    return reg.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    if (!data?.success) {
      return null;
    }

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: TUser) => await updateUserApi(data)
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  selectors: {
    getUserData: (state) => state.userData,
    getUserIsAuth: (state) => state.isAuthenticated,
    getUserIsAuthChecked: (state) => state.isAuthChecked,
    getUserLoginError: (state) => state.regUserError,
    getUserName: (state) => state.userData.name,
    getUserRegisterError: (state) => state.regUserError
  },
  reducers: {
    userLogout(state) {
      state.userData.email = '';
      state.userData.name = '';
      state.isAuthenticated = false;
    }
  },
  extraReducers: (build) => {
    build
      /* Запрос регистрации пользователя */
      .addCase(registerUserThunk.pending, (state) => {
        state.regUserRequest = true;
        state.regUserError = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.regUserRequest = false;
        state.regUserError = action.error;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.regUserRequest = false;
        state.isAuthenticated = true;
        state.userData.email = action.payload?.email || '';
        state.userData.name = action.payload?.name || '';
      })

      /* Запрос авторизация пользователя */
      .addCase(loginUserThunk.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.userData.email = action.payload?.email || '';
        state.userData.name = action.payload?.name || '';
      })

      /* Запрос пользователя */
      .addCase(getUserThunk.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.userData.email = action.payload.user.email;
        state.userData.name = action.payload.user.name;
      })

      /* Запрос обновления пользователя */
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (state.userData.name !== action.payload.user.name)
          state.userData.name = action.payload.user.name;

        if (state.userData.email !== action.payload.user.email)
          state.userData.email = action.payload.user.email;
      });
  }
});

export const {
  getUserData,
  getUserIsAuth,
  getUserIsAuthChecked,
  getUserLoginError,
  getUserName,
  getUserRegisterError
} = userSlice.selectors;

export const { userLogout } = userSlice.actions;

export const userReducer = userSlice.reducer;
