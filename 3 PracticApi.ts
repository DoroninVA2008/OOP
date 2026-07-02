// Шаг 1: Определим тип (интерфейс) данных. Сначала нужно описать, какую структуру данных мы ожидаем от сервера. Изучим ответ API.
// Интерфейс, описывающий модель пользователя с JSONPlaceholder
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    // ... можно описать и вложенные объекты
  };
  phone: string;
  website: string;
  company: {
    // ...
  };
}
// Шаг 2: Напишем типизированную асинхронную функцию.
async function fetchUser(userId: number): Promise<User | null> {
  // 1. Функция объявлена как `async`, значит, она возвращает Promise.
  // 2. Возвращаемый тип Promise<User | null> означает:
  //    - В случае успеха вернётся User.
  //    - В случае ошибки (или если пользователь не найден) мы можем вернуть null.

  try {
    // Выполняем запрос. `fetch` возвращает Promise<Response>.
    const response: Response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // Проверяем, успешен ли HTTP-ответ (статус 200-299).
    if (!response.ok) {
      // Если ответ не успешен (например, 404), выбрасываем ошибку.
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    // Парсим тело ответа как JSON.
    // Тип `User` для переменной `userData` подсказывает TypeScript структуру объекта.
    const userData: User = await response.json();

    // Возвращаем данные. Так как функция `async`, это равносильно return Promise.resolve(userData).
    return userData;

  } catch (error) {
    // Перехватываем любые ошибки: сетевые, ошибки парсинга JSON, выброшенные нами.
    console.error('Не удалось загрузить пользователя:', error);
    // Возвращаем null в качестве индикатора ошибки.
    return null;
  }
}
// Шаг 3: Используем функцию.
async function displayUser() {
  const user = await fetchUser(1); // user имеет тип User | null
  if (user) {
    // TypeScript точно знает, что здесь user имеет тип User (не null).
    console.log(`Имя пользователя: ${user.name}`); // Автодополнение сработает для user.
  } else {
    console.log('Пользователь не найден.');
  }
}