import { expect } from '@jest/globals';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk,
  userReducer
} from '../userSlice';

describe('[Slice]: User', () => {
  const initialState = {
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

  const initialRegisterData = {
    email: '1',
    name: '1',
    password: '1'
  };

  const initialLoginData = {
    email: '1',
    password: '1'
  };

  /* Тесты экшена регистрации */
  test('[test]: экшен registerUserThunk.pending', () => {
    const newState = userReducer(
      initialState,
      registerUserThunk.pending('', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialState,
      regUserRequest: true
    });
  });

  test('[test]: экшен registerUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialState,
      registerUserThunk.rejected(error, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialState,
      regUserError: error
    });
  });

  test('[test]: экшен registerUserThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      email: '1',
      name: '1'
    };

    const newState = userReducer(
      initialState,
      registerUserThunk.fulfilled(response, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      userData: {
        email: '1',
        name: '1'
      }
    });
  });

  /* Тесты экшена авторизации */
  test('[test]: экшен loginUserThunk.pending', () => {
    const newState = userReducer(
      initialState,
      loginUserThunk.pending('', initialLoginData)
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: true
    });
  });

  test('[test]: экшен loginUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialState,
      loginUserThunk.rejected(error, '', initialLoginData)
    );

    expect(newState).toEqual({
      ...initialState,
      loginUserError: error
    });
  });

  test('[test]: экшен loginUserThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      email: '1',
      name: '1'
    };

    const newState = userReducer(
      initialState,
      loginUserThunk.fulfilled(response, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      userData: {
        email: '1',
        name: '1'
      }
    });
  });

  /* Тесты экшена получения пользователя */
  test('[test]: экшен getUserThunk.pending', () => {
    const newState = userReducer(initialState, getUserThunk.pending(''));

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: true
    });
  });

  test('[test]: экшен getUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialState,
      getUserThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loginUserError: error
    });
  });

  test('[test]: экшен getUserThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      user: {
        email: '1',
        name: '1'
      },
      success: true
    };

    const newState = userReducer(
      initialState,
      getUserThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      userData: {
        email: '1',
        name: '1'
      }
    });
  });

  /* Тесты экшена обновления пользователя */
  test('[test]: экшен updateUserThunk.fulfilled,', () => {
    /* Тестовый ответ на запрос */
    const response = {
      user: {
        email: '2',
        name: '2'
      },
      success: true
    };

    /* Делаем запрос и меняем данные */
    const newState = userReducer(
      initialState,
      updateUserThunk.fulfilled(response, '', { email: '2', name: '2' })
    );

    /* Сверяем новые данные */
    expect(newState).toEqual({
      ...initialState,
      userData: {
        email: '2',
        name: '2'
      }
    });
  });

  /* Тесты экшена выходи из профиля */
  test('[test]: экшен logoutUserThunk.fulfilled,', () => {
    const newState = userReducer(
      initialState,
      logoutUserThunk.fulfilled(undefined, '')
    );

    expect(newState).toEqual(initialState);
  });
});
