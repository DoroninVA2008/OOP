// Промис, который выполнится строкой
const promiseString: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve("Готово!"), 1000);
});

// Функция, возвращающая промис с числом
function fetchNumber(): Promise<number> {
  return new Promise((resolve) => resolve(42));
}

// Промис, который выполнится массивом пользователей (по интерфейсу User)
const usersPromise: Promise<User[]> = fetch('/api/users').then(r => r.json());