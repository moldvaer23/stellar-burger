import { expect } from '@jest/globals';
import {
  getUserThunk,
  initialStateUser,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk,
  userReducer
} from '../userSlice';

describe('[Slice]: User', () => {
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
      initialStateUser,
      registerUserThunk.pending('', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
      regUserRequest: true
    });
  });

  test('[test]: экшен registerUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialStateUser,
      registerUserThunk.rejected(error, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
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
      initialStateUser,
      registerUserThunk.fulfilled(response, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
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
      initialStateUser,
      loginUserThunk.pending('', initialLoginData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
      isAuthChecked: true,
      loginUserRequest: true
    });
  });

  test('[test]: экшен loginUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialStateUser,
      loginUserThunk.rejected(error, '', initialLoginData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
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
      initialStateUser,
      loginUserThunk.fulfilled(response, '', initialRegisterData)
    );

    expect(newState).toEqual({
      ...initialStateUser,
      isAuthenticated: true,
      userData: {
        email: '1',
        name: '1'
      }
    });
  });

  /* Тесты экшена получения пользователя */
  test('[test]: экшен getUserThunk.pending', () => {
    const newState = userReducer(initialStateUser, getUserThunk.pending(''));

    expect(newState).toEqual({
      ...initialStateUser,
      isAuthChecked: true,
      loginUserRequest: true
    });
  });

  test('[test]: экшен getUserThunk.rejected,', () => {
    /* Создаем ошибку */
    const error: Error = { message: 'ERROR', name: 'ERROR' };

    const newState = userReducer(
      initialStateUser,
      getUserThunk.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialStateUser,
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
      initialStateUser,
      getUserThunk.fulfilled(response, '')
    );

    expect(newState).toEqual({
      ...initialStateUser,
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
      initialStateUser,
      updateUserThunk.fulfilled(response, '', { email: '2', name: '2' })
    );

    /* Сверяем новые данные */
    expect(newState).toEqual({
      ...initialStateUser,
      userData: {
        email: '2',
        name: '2'
      }
    });
  });

  /* Тесты экшена выходи из профиля */
  test('[test]: экшен logoutUserThunk.fulfilled,', () => {
    const newState = userReducer(
      initialStateUser,
      logoutUserThunk.fulfilled(undefined, '')
    );

    expect(newState).toEqual(initialStateUser);
  });
});
