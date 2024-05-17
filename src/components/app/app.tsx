import { useEffect } from 'react';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import styles from './app.module.css';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { getUserThunk } from '../../services/slices/userSlice';
import { getFeedsThunk } from '../../services/slices/feedsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';

import '../../index.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.background;

  /* Делаем запросы базовых данных которые нужны будут для работы приложения */
  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getFeedsThunk());
  }, []);

  /* Проверка на наличие токена в куках если он есть проводим запрос на получения данных о пользователе */
  /* В случае успеха проводим авторизацию */
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* Публичные маршруты */}

        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<Feed />} />

        {/* Приватные маршруты  */}
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
