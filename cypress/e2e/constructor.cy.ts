describe('[Page]: ConstructorPage', () => {
  /* Конфигурация данных для тестов */
  const URL = 'https://norma.nomoreparties.space/api';
  const bunIndex = 0;
  const ingredientIndex = 3;

  beforeEach(() => {
    /* Перехватываем запрос на получение ингредиентов */
    cy.intercept(
      {
        method: 'GET',
        url: `${URL}/ingredients`
      },
      {
        fixture: 'ingredients.json'
      }
    ).as('getIngredients');

    /* В начале каждого теста посещаем страницу */
    cy.visit('http://localhost:4000');

    /* Проверяем что страница отобразилась */
    cy.get("[data-testid='page']").should('exist');
  });

  /* Чистим store и cookie после каждого теста */
  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
  });

  it('[test]: Добавление ингредиента в конструктор', () => {
    /* Ищем ингредиент по индексу и кликаем на его кнопку добавления */
    cy.get("[data-testid='burger-ingredient-item']")
      .eq(ingredientIndex)
      .find('button')
      .click();

    /* Проверяем что ингредиент появился */
    cy.get("[data-testid='burger-constructor-ingredient']");
  });

  it('[test]: Открытие и закрытие модального окна с описанием ингредиента', () => {
    /* Ищем ингредиент по индексу и кликаем на его ссылку  */
    cy.get("[data-testid='burger-ingredient-item']")
      .eq(ingredientIndex)
      .find('a')
      .click();

    /* Ищем модальное окно, закрываем его и смотрит что его нету */
    cy.get("[data-testid='modal']");
    cy.get("[data-testid='modal-close-button'").click();
    cy.get("[data-testid='modal']").should('not.exist');
  });

  it('[test]: Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик.', () => {
    /* Функция для поиска названия ингредиента по индексу */
    const ingredient = () =>
      cy.get("[data-testid='burger-ingredient-name']").eq(ingredientIndex);

    /* Открываем модальное окно у этого ингредиента */
    cy.get("[data-testid='burger-ingredient-item']")
      .eq(ingredientIndex)
      .find('a')
      .click();

    /* Смотрим что модальное окно открылось и проверяем наличие того же самого текста */
    cy.get("[data-testid='modal']");

    ingredient().then((item) => {
      cy.get("[data-testid='modal-ingredient-name'").should(
        'have.text',
        item.text()
      );
    });
  });

  it('[test]: Процесс создания заказа', () => {
    /* Переходим на страницу авторизации */
    cy.visit('http://localhost:4000/login');

    /* Вводим данные для авторизации */
    cy.get("[data-testid='login-email-input']").type('volkovvova67@gmail.com');
    cy.get("[data-testid='login-password-input']").type('45151987Kgt!1');

    /* Перехватываем запрос на авторизацию */
    cy.intercept(
      {
        method: 'POST',
        url: `${URL}/auth/login`
      },
      {
        fixture: 'login.json'
      }
    ).as('login');

    /* Делаем запрос на авторизацию */
    cy.get("[data-testid='login-button']").click();

    cy.wait('@login').then((res) => {
      /* После запроса устанавливаем значения токенов */
      window.localStorage.setItem(
        'refreshToken',
        res.response?.body.refreshToken
      );
      cy.setCookie('accessToken', res.response?.body.accessToken);
    });

    /* Проверяем что редиректнуло на главную страницу после успешной авторизации */
    cy.location('pathname').should('eq', '/');

    /* Добавляем булку */
    cy.get("[data-testid='burger-ingredient-item']")
      .eq(bunIndex)
      .find('button')
      .click();

    /* Добавляем ингредиент */
    cy.get("[data-testid='burger-ingredient-item']")
      .eq(ingredientIndex)
      .find('button')
      .click();

    /* Перехватываем запрос на создание заказа */
    cy.intercept(
      {
        method: 'POST',
        url: `${URL}/orders`
      },
      {
        fixture: 'orders.json'
      }
    ).as('createOrder');

    /* Создаем запрос на создание заказа */
    cy.get("[data-testid='burger-constructor-order-button'").click();

    /* Проверяем открытие модального окна и ожидаем ответа  */
    cy.get("[data-testid='modal']");

    cy.wait('@createOrder').then((res) => {
      /* После запроса проверяем тот ли номер заказа который должен быть */
      cy.get("[data-testid='modal-order-number'").should(
        'have.text',
        res.response?.body.order.number
      );
    });

    /* Проверяем что ингредиенты были удалены */
    cy.get("[ data-testid='modal-close-button'").click();
    cy.get("[data-testid='burger-constructor-ingredient']").should('not.exist');
  });
});
