interface Address {
  city?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: {};
}

async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response: Response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const userData: User = await response.json();

    if (userData.address && userData.address.city) {
      console.log(`Город: ${userData.address.city}`)
    }

    return userData;

  } catch (error) {
    console.error('Не удалось загрузить пользователя:', error);
    return null;
  }
}

async function displayUser(): Promise<void> {
  const user = await fetchUser(1);
  if (user) {
    console.log(`Имя пользователя: ${user.name}`);
  } else {
    console.log('Пользователь не найден.');
  }
}