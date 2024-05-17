import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as ReactDOMClient from 'react-dom/client';

import store from './services/store';
import App from './components/app/app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

/* Отключил строгий режим по причине того что ингредиенты отображаются x2 раза из-за этого ошибки в консоле (дупликация key у объектов) */
/* Возможно я не в том месте отправляю запрос и по этому происходит такая ошибка, но я такое место не нашел */
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
