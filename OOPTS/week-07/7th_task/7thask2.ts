import type { User } from './task7.1.ts'

async function fetchUsers(city?: string): Promise<User[]> {
  try {
    const response: Response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    const users: User[] = await response.json();
    
    if (city) {
      const filteredUsers = users.filter(user => user.address?.city === city);
      console.log(`Найдено пользователей из города ${city}: ${filteredUsers.length}`);
      return filteredUsers;
    }
    
    console.log(`Всего пользователей: ${users.length}`);
    return users;
    
  } catch (error) {
    console.error('Не удалось загрузить список пользователей:', error);
    return [];
  }
}

async function displayUsersByCity() {
  const allUsers = await fetchUsers();
  console.log('Все пользователи:', allUsers);

  const usersFromGwenborough = await fetchUsers('Gwenborough');
  console.log('Пользователи из Gwenborough:', usersFromGwenborough);
}